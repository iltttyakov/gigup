from django.contrib import admin

from .models import Instrument, Genre, User

admin.site.register(Instrument)
admin.site.register(Genre)
admin.site.register(User)
