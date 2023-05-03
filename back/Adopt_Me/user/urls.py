from django.contrib import admin
from django.urls import path, include
from django.http.response import HttpResponse
from .views import register, login, UserView, LogoutView



urlpatterns = [
    path('register', register.as_view()),
    path('login', login.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view())
]

