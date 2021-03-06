# Generated by Django 3.2.4 on 2021-06-25 12:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(upload_to='users', verbose_name='Фото профиля'),
        ),
        migrations.RemoveField(
            model_name='user',
            name='genre',
        ),
        migrations.AddField(
            model_name='user',
            name='genre',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.genre', verbose_name='Жанр'),
        ),
    ]
