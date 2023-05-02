from django.contrib import admin
from pets.models import pet, adoption, shelter, volonturees, type_of_animals

admin.site.register(pet)
admin.site.register(adoption)
admin.site.register(shelter)
admin.site.register(volonturees)
admin.site.register(type_of_animals)

