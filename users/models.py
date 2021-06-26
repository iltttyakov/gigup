from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import PermissionsMixin

from .constants.cities import CITIES_CHOICES
from .constants.skill_levels import SKILL_LEVEL_CHOICES
from .constants.statuses import STATUS_CHOICES, LOOKING_FOR
from .managers.UserManager import UserManager


class Genre(models.Model):
    class Meta:
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'

    name = models.CharField('Название', max_length=70)

    def __str__(self):
        return f'{self.name}'


class Instrument(models.Model):
    class Meta:
        verbose_name = 'Инструмент'
        verbose_name_plural = 'Инструменты'

    name = models.CharField('Название', max_length=70)

    def __str__(self):
        return f'{self.name}'


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = [
        'full_name',
        'status',
        'location',
        'age',
        'skill_level',
    ]

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    phone = models.CharField('Номер телефона', max_length=18, unique=True)
    avatar = models.ImageField('Фото профиля', upload_to='users', blank=True, null=True)
    full_name = models.CharField('Имя', max_length=150)
    genre = models.ForeignKey(Genre, verbose_name='Жанр', null=True, on_delete=models.SET_NULL)
    instrument = models.ForeignKey(Instrument, verbose_name='Инструмент', null=True, on_delete=models.SET_NULL)
    status = models.CharField('Статус', max_length=50, choices=STATUS_CHOICES, default=LOOKING_FOR)
    custom_status = models.CharField('Свой статус', max_length=150, blank=True, null=True)
    location = models.CharField('Город', max_length=150, choices=CITIES_CHOICES)
    age = models.IntegerField('Возраст')
    skill_level = models.IntegerField('Уровень игры', choices=SKILL_LEVEL_CHOICES)
    youtube_ids = models.TextField('ID видео с youtube через ","', null=True, blank=True)

    is_staff = models.BooleanField('Администратор?', default=False)

    telegram = models.CharField('Telegram', max_length=100, blank=True, null=True)
    vk = models.CharField('ВКонтакте', max_length=100, null=True, blank=True)
    instagram = models.CharField('Instagram', max_length=100, null=True, blank=True)

    def __str__(self):
        return f'<{self.id}> | {self.full_name}'
