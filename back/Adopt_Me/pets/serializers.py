from rest_framework import serializers
from .models import pet, shelter,  volonturees

# Serializers using serializer.Serializer
class PetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    breed = serializers.CharField(max_length=50)
    age = serializers.IntegerField()
    gender = serializers.CharField(max_length=10)
    description = serializers.CharField()

    def create(self, validated_data):
        return pet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.breed = validated_data.get('breed', instance.breed)
        instance.age = validated_data.get('age', instance.age)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = shelter
        fields = '__all__'



class VolontureesSerializer(serializers.ModelSerializer):
    working_shelter = ShelterSerializer(read_only=True)

    class Meta:
        model = volonturees
        fields = '__all__'

