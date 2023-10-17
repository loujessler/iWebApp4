from rest_framework import viewsets

from ..models import CustomUser
from ..serializers import CustomUserSerializer


class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
