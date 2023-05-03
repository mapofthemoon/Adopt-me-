from django.db import models

class pet(models.Model):
    name = models.CharField(max_length=50)
    breed = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)
    description = models.TextField()
    photo = models.ImageField(upload_to='animal_photos/')

    def to_json(self):
        return self.name


#class adoption(models.Model):
# person = models.CharField(max_length=50)
#email = models.EmailField()
#phone = models.CharField(max_length=50)
#animal = models.ForeignKey(pet, on_delete=models.CASCADE, related_name='applications')
#application_date = models.DateTimeField(auto_now_add=True)

#def to_json(self):
 #   return f'{self.person} for {self.animal.name}'


class shelter(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)

    def to_json(self):
        return self.name

class volonturees(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length = 50)
    age = models.PositiveBigIntegerField()
    working_shelter = models.ForeignKey(shelter, on_delete=models.CASCADE, related_name = 'work')

    def to_json(self):
        return self.name


# class type_of_animals(models.Model):
#     breed = models.ForeignKey(pet, on_delete = models.CASCADE, related_name = 'cat dog+')
    
#     def to_json(self):
#         return self.breed
