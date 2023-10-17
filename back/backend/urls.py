from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from users.views.custom_user_view import CustomUserView
from users.views.login_view import LoginView
from users.views.register_view import RegisterView
from users.views.user_action_view import UserActionView

router = routers.DefaultRouter()
router.register(r'users', CustomUserView, 'user')

actions = ['block', 'unblock', 'delete']

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/register/', RegisterView.as_view(), name='register'),
] + [path(f'api/{action}/users/', UserActionView.as_view(), name=action) for action in actions]
