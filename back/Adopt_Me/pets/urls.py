from django.urls import path, re_path
from pets import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PetList, PetDetail, ShelterList, ShelterDetail, VolontureesList, VolontureesDetail, add_pet, edit_pet, delete_pet, add_volonturees, edit_volonturees, delete_volonturee, add_shelter, edit_shelter, delete_shelter, show_text

urlpatterns = [
    path('pets/', views.PetList),
    path('pets/<int:pk>/', views.PetDetail),
    path('shelters/', ShelterList.as_view()),
    path('shelters/<int:pk>/', ShelterDetail.as_view()),
    path('volonturees/', VolontureesList.as_view()),
    path('volonturees/<int:pk>/', VolontureesDetail.as_view()),
    path('add_pet/', add_pet, name='add_pet'),
    path('pets/<int:pk>/edit/', views.edit_pet, name='edit_pet'),
    path('pets/<int:pk>/delete/', views.delete_pet, name='delete_pet'),
    path('add_volonturees/', views.add_volonturees, name='add_volonturees'),
    path('volonturees/<int:pk>/edit/', views.edit_volonturees, name='edit_volonturees'),
    path('volonturees/<int:pk>/delete/', views.delete_volonturee, name='delete_volonturee'),
    path('add_shelter/', views.add_shelter, name='add_shelter'),
    path('shelters/<int:pk>/edit/', views.edit_shelter, name='edit_shelter'),
    path('shelters/<int:pk>/delete/', views.delete_shelter, name='delete_shelter'),
    path('mytext/', views.show_text, name='my_text')
]

urlpatterns = format_suffix_patterns(urlpatterns)
