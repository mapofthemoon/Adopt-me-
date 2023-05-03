from django.contrib import admin
from pets.models import pet, shelter, volonturees

admin.site.register(pet)
admin.site.register(shelter)
admin.site.register(volonturees)

