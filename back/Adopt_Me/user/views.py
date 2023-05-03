from django.shortcuts import render
from .models import user
from rest_framework.views import APIView
from .serializers import userSerializers
from rest_framework.response import Response
class register(APIView):
    def get(self, request):
        users = user.objects.all()
        serializer = userSerializers(users, many=True)
        return Response(serializer.data)
    
    def post (self, request):
        serializer = userSerializers(data=request.data)
        serializer.is_valid (raise_exception=True)
        serializer.save()
        return Response(serializer.data)  


