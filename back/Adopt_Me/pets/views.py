from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import pet, adoption, shelter
from .serializers import PetSerializer, AdoptionSerializer, ShelterSerializer

@api_view(['GET'])
def PetList(request):
    pets = pet.objects.all()
    serializer = PetSerializer(pets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def PetDetail(request, pk):
    try:
        pet = pet.objects.get(pk=pk)
    except pet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = PetSerializer(pet)
    return Response(serializer.data)


class ShelterList(APIView):
    def get(self, request):
        shelters = shelter.objects.all()
        serializer = ShelterSerializer(shelters, many=True)
        return Response(serializer.data)


def add_shelter(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        new_shelter = shelter(name=name, address=address, phone=phone)
        new_shelter.save()
        return JsonResponse({'name': new_shelter.name})

   
    return JsonResponse({'error': 'Invalid request method'})

def delete_shelter(request, shelter_id):
    if request.method == 'DELETE':
        try:
            shelter_instance = shelter.objects.get(id=shelter_id)
            shelter_instance.delete()
            
            return JsonResponse({'message': 'Shelter deleted successfully.'})
        
        except shelter.DoesNotExist:
            return JsonResponse({'error': 'Shelter does not exist.'}, status=404)
        
    return JsonResponse({'error': 'Invalid request method.'})




def edit_shelter(request, shelter_id):
    if request.method == 'PUT':
        try:
            shelter_instance = shelter.objects.get(id=shelter_id)
            
            shelter_instance.name = request.PUT.get('name', shelter_instance.name)
            shelter_instance.address = request.PUT.get('address', shelter_instance.address)
            shelter_instance.phone = request.PUT.get('phone', shelter_instance.phone)
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
