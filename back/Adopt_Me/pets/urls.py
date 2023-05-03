from django.urls import path, re_path
from pets import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PetList, PetDetail, ShelterList, VolontureesList, VolontureesDetail

urlpatterns = [
    path('pets/', views.PetList),
    path('pets/<int:pk>/', views.PetDetail),
    path('shelters/', ShelterList.as_view()),
    path('shelters/<int:pk>/', views.ShelterDetail),
    path('volonturees/', VolontureesList.as_view()),
    path('volonturees/<int:pk>/', views.VolontureesDetail)
]

urlpatterns = format_suffix_patterns(urlpatterns)
