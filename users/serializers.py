from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Genre, Instrument, User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['phone'] = user.phone
        return token


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    instrument = InstrumentSerializer()
    genre = GenreSerializer()

    class Meta:
        model = User
        fields = (
            'id', 'avatar', 'phone', 'full_name', 'genre', 'instrument',
            'status', 'status_display', 'custom_status', 'location', 'age', 'skill_level', 'youtube_ids',
            'vk', 'instagram', 'telegram'
        )


class UserMeSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    instrument = InstrumentSerializer()
    genre = GenreSerializer()
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id', 'password', 'avatar', 'phone', 'full_name', 'genre', 'instrument',
            'status', 'status_display', 'custom_status', 'location', 'age', 'skill_level', 'youtube_ids', 'tokens',
            'vk', 'instagram', 'telegram'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def get_tokens(self, user):
        tokens = RefreshToken.for_user(user)
        refresh = str(tokens)
        access = str(tokens.access_token)
        data = {
            'refresh': refresh,
            'access': access
        }
        return data



class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = (
            'avatar', 'phone', 'full_name', 'genre', 'instrument', 'status',
            'custom_status', 'location', 'age', 'skill_level', 'password', 'youtube_ids',
            'vk', 'instagram', 'telegram'
        )

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)

        if 'youtube_ids' not in validated_data:
            instance.youtube_ids = None

        instance.save()
        return instance


class UserSignUpSerializer(serializers.ModelSerializer):
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id', 'password', 'avatar', 'phone', 'full_name', 'genre', 'instrument',
            'status', 'custom_status', 'location', 'age', 'skill_level', 'youtube_ids', 'tokens',
            'vk', 'instagram', 'telegram'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def get_tokens(self, user):
        tokens = RefreshToken.for_user(user)
        refresh = str(tokens)
        access = str(tokens.access_token)
        data = {
            'refresh': refresh,
            'access': access
        }
        return data

    def create(self, validated_data):
        user = User(phone=validated_data['phone'])

        fields = [
            'avatar',
            'phone',
            'full_name',
            'genre',
            'instrument',
            'status',
            'custom_status',
            'location',
            'age',
            'skill_level',
            'youtube_ids',
            'vk',
            'instagram',
            'telegram'
        ]

        for field_name in fields:
            if field_name in validated_data:
                user.__setattr__(field_name, validated_data[field_name])

        user.set_password(validated_data['password'])
        user.save()
        return user
