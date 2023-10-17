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


# class UserActionView(APIView):
#     @staticmethod
#     def post(request):
#         action = request.data.get('action')  # Получите действие (Block, Unblock или Delete)
#         user_ids = request.data.get('user_ids', [])  # Получите список ID выбранных пользователей
#         print(user_ids)
#         print(action)
#
#         if action not in ('Block', 'Unblock', 'Delete'):
#             return Response({'message': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
#
#         try:
#             users = CustomUser.objects.filter(id__in=user_ids)
#             if action == 'Delete':
#                 # Удаление выбранных пользователей
#                 users.delete()
#                 message, http_status = 'Users deleted successfully', status.HTTP_200_OK
#             elif action in ('Block', 'Unblock'):
#                 is_active = action == 'Unblock'
#                 users.update(is_active=is_active)
#                 message, http_status = f'Users {action.lower()}ed successfully', status.HTTP_200_OK
#             else:
#                 message, http_status = 'Invalid action', status.HTTP_400_BAD_REQUEST
#             return Response({'message': message, 'userWasBlockedOrDeleted': user_action}, status=http_status)
#         except Exception as e:
#             return Response({'message': f'Error {action.lower()}ing users'}, status=status.HTTP_400_BAD_REQUEST)
