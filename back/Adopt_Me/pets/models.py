from django.db import models

class shelter(models.Model):
    name = models.CharField(max_length=50,blank=True, null=True)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)

    def to_json(self):
        return self.name
    
    
class pet(models.Model):
    name = models.CharField(max_length=50)
    type_of_animal = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)
    description = models.TextField()
    photo = models.ImageField(upload_to='animal_photos/')
    shelter = models.ForeignKey(shelter, on_delete=models.CASCADE)
    
    def to_json(self):
        return self.name
    


class volonturees(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length = 50)
    age = models.PositiveBigIntegerField()
    working_shelter = models.ForeignKey(shelter, on_delete=models.CASCADE, related_name = 'work')

    def to_json(self):
        return self.name
    
class LearnMore(models.Model):
    text = models.TextField()




