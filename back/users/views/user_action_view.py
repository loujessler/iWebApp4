from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..models import CustomUser


class UserActionView(APIView):
    @staticmethod
    def delete_users(users):
        users.delete()

    @staticmethod
    def update_user_status(users, action):
        is_active = action == 'Unblock'
        users.update(is_active=is_active)

    def post(self, request):
        action = request.data.get('action')
        user_ids = request.data.get('user_ids', [])
        result, http_status = self.perform_action(action, user_ids)
        return Response({'message': result}, status=http_status)

    def perform_action(self, action, user_ids):
        try:
            users = CustomUser.objects.filter(id__in=user_ids)
            if action == 'Delete':
                self.delete_users(users)
                return 'Users deleted successfully', status.HTTP_200_OK
            elif action in ('Block', 'Unblock'):
                self.update_user_status(users, action)
                return f'Users {action.lower()}ed successfully', status.HTTP_200_OK
            else:
                return 'Invalid action', status.HTTP_400_BAD_REQUEST
        except Exception as e:
            return f'Error {action.lower()}ing users', status.HTTP_400_BAD_REQUEST
