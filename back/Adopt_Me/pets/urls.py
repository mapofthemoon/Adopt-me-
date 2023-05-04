from django.urls import path, re_path
from pets import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PetList, PetDetail, ShelterList, VolontureesList, VolontureesDetail, add_pet, edit_pet, delete_pet, add_volonturees, edit_volonturees, delete_volonturee, add_shelter, edit_shelter, delete_shelter

urlpatterns = [
    path('pets/', views.PetList),
    path('pets/<int:pk>/', views.PetDetail),
    path('shelters/', ShelterList.as_view()),
    path('shelters/<int:pk>/', views.ShelterDetail),
    path('volonturees/', VolontureesList.as_view()),
    path('volonturees/<int:pk>/', views.VolontureesDetail),
    path('add_pet/', add_pet, name='add_pet'),
    path('pets/<int:pk>/edit/', edit_pet, name='edit_pet'),
    path('pets/<int:pk>/delete/', delete_pet, name='delete_pet'),
    path('add_volonturees/', add_volonturees, name='add_volonturees'),
    path('volonturees/<int:pk>/edit/', edit_volonturees, name='edit_volonturees'),
    path('volonturees/<int:pk>/delete/', delete_volonturee, name='delete_volonturee'),
    path('add_shelter/', add_shelter, name='add_shelter'),
    path('shelters/<int:pk>/edit/', edit_shelter, name='edit_shelter'),
    path('shelters/<int:pk>/delete/', delete_shelter, name='delete_shelter'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
