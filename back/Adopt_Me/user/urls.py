from django.contrib import admin
from django.urls import path, include
from django.http.response import HttpResponse
from .views import register


urlpatterns = [
    path('register', register.as_view())
]
