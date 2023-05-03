from rest_framework import serializers
from .models import pet, adoption, shelter

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


class AdoptionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    person = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=50)
    animal_id = serializers.IntegerField()

    def create(self, validated_data):
        return adoption.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.person = validated_data.get('person', instance.person)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.animal_id = validated_data.get('animal_id', instance.animal_id)
        instance.save()
        return instance


# Serializers using serializer.ModelSerializer
class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = shelter
        fields = '__all__'




