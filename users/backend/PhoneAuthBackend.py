from django.contrib.auth.backends import ModelBackend
from ..models import User


class PhoneAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            phone = username.replace('(', '').replace(')', '').replace('-', ' ').replace(' ', '')[-10:]
            user = User.objects.get(phone=phone)
            if user.check_password(password):
                return user
            else:
                return None
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
