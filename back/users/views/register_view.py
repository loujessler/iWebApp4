from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..models import CustomUser
from ..serializers import RegisterSerializer


class RegisterView(APIView):
    @staticmethod
    def post(request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            CustomUser.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            user = CustomUser.objects.get(username=serializer.validated_data['username'])
            return Response({'message': 'User registered successfully', 'user_id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
