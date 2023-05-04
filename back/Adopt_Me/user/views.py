from django.shortcuts import render
from .models import user as User
from rest_framework.views import APIView
from .serializers import userSerializers
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime


class register(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = userSerializers(users, many=True)
        return Response(serializer.data)
    
    def post (self, request):
        serializer = userSerializers(data=request.data)
        serializer.is_valid (raise_exception=True)
        serializer.save()
        return Response(serializer.data)  


class login(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
            # .decode('utf-8')
        response = Response()
       
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = userSerializers(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

