from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
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



