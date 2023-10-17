from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login

from ..serializers import LoginSerializer


class LoginView(APIView):
    @staticmethod
    def post(request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return Response({'message': 'Login successful', 'user_id': user.id}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
