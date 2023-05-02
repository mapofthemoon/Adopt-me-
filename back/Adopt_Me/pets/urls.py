from django.urls import path, re_path
from pets import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PetList, PetDetail, ShelterList, DonationCreate

urlpatterns = [
    path('pets/', PetList),
    path('pets/<int:pk>/', PetDetail),
    path('shelters/', ShelterList.as_view()),
    path('donations/', DonationCreate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
