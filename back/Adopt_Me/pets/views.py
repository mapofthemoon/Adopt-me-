import json
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404, HttpResponse, HttpResponseBadRequest, JsonResponse
from rest_framework.views import APIView
from .models import pet, shelter, volonturees, LearnMore
from .serializers import PetSerializer, ShelterSerializer, VolontureesSerializer
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.http import HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

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
        Shelters = shelter.objects.all()
        serializer = ShelterSerializer(Shelters, many=True)
        return Response(serializer.data)

class ShelterDetail(APIView):
    def get(self, request, pk):
        Shelter = None
        try:
            Shelter = get_object_or_404(shelter, pk=pk)
        except Http404:
            pass

        if Shelter:
            serializer = ShelterSerializer(Shelter)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


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
    

class VolontureesDetail(APIView):
    def get(self, request, pk):
        Volonturee = None  
        try:
            Volonturee = get_object_or_404(volonturees, pk=pk)  
        except Http404:
            Volonturee = None  

        serializer = VolontureesSerializer(Volonturee)
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

@csrf_exempt
def delete_pet(request, pk):
    try:
        Pet = get_object_or_404(pet, pk=pk)
    except Http404:
        return JsonResponse({'error': 'Pet not found'}, status=404)
    Pet.delete()
    return JsonResponse({'success': True})


@csrf_exempt
def add_shelter(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        if not name:
            return JsonResponse({'error': 'Name is required'})
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


import json

@csrf_exempt
def edit_shelter(request, pk):
    if request.method == 'PUT':
        try:
            shelter_instance = shelter.objects.get(pk=pk)
        except shelter.DoesNotExist:
            return JsonResponse({'error': 'Shelter does not exist.'}, status=404)

        try:
            json_data = request.body.decode('utf-8')
            data = json.loads(json_data)
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON string.')

        shelter_instance.name = data.get('name', shelter_instance.name)
        shelter_instance.address = data.get('address', shelter_instance.address)
        shelter_instance.phone = data.get('phone', shelter_instance.phone)
        shelter_instance.save()

        return JsonResponse({
            'id': shelter_instance.id,
            'name': shelter_instance.name,
            'address': shelter_instance.address,
            'phone': shelter_instance.phone
        })

    return JsonResponse({'error': 'Invalid request method.'})

@csrf_exempt
@api_view(['POST'])
def add_volonturees(request):
    serializer = VolontureesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def edit_volonturees(request, pk):
    volonturee = get_object_or_404(volonturees, pk=pk)
    serializer = VolontureesSerializer(volonturees, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def delete_volonturee(request, pk):
    volonturee = get_object_or_404(volonturees, pk=pk)
    if request.method == 'DELETE':
        volonturee.delete()
        return JsonResponse({'message': 'Volonturee deleted successfully.'}, status=204)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)


def show_text(request):
    my_text = LearnMore.objects.first()
    return render(request, 'show_text.html', {'text': my_text.text})

