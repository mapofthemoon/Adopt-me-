from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from .models import pet, shelter, volonturees
from .serializers import PetSerializer, ShelterSerializer, VolontureesSerializer
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.http import HttpResponseNotAllowed

@api_view(['GET'])
def PetList(request):
    pets = pet.objects.all()
    serializer = PetSerializer(pets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def PetDetail(request, pk):
    try:
        pet_obj = pet.objects.get(pk=pk)
    except pet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = PetSerializer(pet_obj)
    return Response(serializer.data)



class ShelterList(APIView):
    def get(self, request):
        shelters = shelter.objects.all()
        serializer = ShelterSerializer(shelters, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ShelterDetail(request, pk):
    try:
        shelter = shelter.objects.get(pk=pk)
    except shelter.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ShelterSerializer(shelter)
    return Response(serializer.data)

class VolontureesList(APIView):
    def get(self, request):
        volonturees_qs = volonturees.objects.all()
        serializer = VolontureesSerializer(volonturees_qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VolontureesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def VolontureesDetail(request, pk):
    try:
        volonturees = volonturees.objects.get(pk=pk)
    except volonturees.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = VolontureesSerializer(volonturees)
    return Response(serializer.data)


@api_view(['POST'])
def add_pet(request):
    serializer = PetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def edit_pet(request, pk):
    try:
        pet_instance = pet.objects.get(id=pk)
    except pet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PetSerializer(pet_instance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_pet(request, pk):
    pet = get_object_or_404(pet, pk=pk)
    pet.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



def add_shelter(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        new_shelter = shelter(name=name, address=address, phone=phone)
        new_shelter.save()
        return JsonResponse({'name': new_shelter.name})

   
    return JsonResponse({'error': 'Invalid request method'})


def delete_shelter(request, pk):
    if request.method == 'DELETE':
        try:
            shelter_instance = shelter.objects.get(id=pk)
            shelter_instance.delete()
            
            return JsonResponse({'message': 'Shelter deleted successfully.'})
        
        except shelter.DoesNotExist:
            return JsonResponse({'error': 'Shelter does not exist.'}, status=404)
        
    return JsonResponse({'error': 'Invalid request method.'})



def edit_shelter(request, pk):
    if request.method == 'POST' and request.POST.get('_method') == 'PUT':
        try:
            shelter_instance = shelter.objects.get(id=pk)
            
            shelter_instance.name = request.POST.get('name', shelter_instance.name)
            shelter_instance.address = request.POST.get('address', shelter_instance.address)
            shelter_instance.phone = request.POST.get('phone', shelter_instance.phone)
            shelter_instance.save()
            
            return JsonResponse({
                'id': shelter_instance.id,
                'name': shelter_instance.name,
                'address': shelter_instance.address,
                'phone': shelter_instance.phone
            })
        
        except shelter.DoesNotExist:
            return JsonResponse({'error': 'Shelter does not exist.'}, status=404)
    
    return JsonResponse({'error': 'Invalid request method.'})



@api_view(['POST'])
def add_volonturees(request):
    serializer = VolontureesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def edit_volonturees(request, volonturee_id):
    volonturee = get_object_or_404(volonturees, pk=volonturee_id)
    serializer = VolontureesSerializer(volonturees, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_volonturee(request, pk):
    volonturee = get_object_or_404(volonturees, pk=pk)
    if request.method == 'DELETE':
        volonturee.delete()
        return JsonResponse({'message': 'Volonturee deleted successfully.'}, status=204)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)


