from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, phone, password, **extra_fields):
        """ Создаёт и сохраняет пользователя """
        if not phone:
            raise ValueError('Задайте номер телефона')
        if not password:
            raise ValueError('Задайте пароль')
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, phone, password=None, **extra_fields):
        return self._create_user(phone, password, **extra_fields)

    def create_superuser(self, phone, password=None, **extra_fields):
        user = self._create_user(phone, password, **extra_fields)
        user.is_staff = True
        user.save()
        return user
