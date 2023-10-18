from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from ..models import CustomUser
from ..serializers import CustomUserSerializer


class CustomUserView(ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
