from rest_framework import serializers
from .models import pet, shelter, volonturees

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = pet
        fields = '__all__'

class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = shelter
        fields = '__all__'

class VolontureesSerializer(serializers.ModelSerializer):
    class Meta:
        model = volonturees
        fields = '__all__'

