from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Genre, Instrument, User
from .permissions import IsAdminOrReadOnly
from .serializers import MyTokenObtainPairSerializer, GenreSerializer, InstrumentSerializer, UserSerializer, \
    UserSignUpSerializer, UserUpdateSerializer, UserMeSerializer


class TokenObtainPairViewWithInfo(TokenObtainPairView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class GenreListView(ListAPIView):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()


class InstrumentListView(ListAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = InstrumentSerializer
    queryset = Instrument.objects.all()


class UserListView(ListAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = User.objects.all()

        location = self.request.query_params.get('location')
        instrument = self.request.query_params.get('instrument')
        genre = self.request.query_params.get('genre')
        age = self.request.query_params.get('age')
        skill_level = self.request.query_params.get('skill_level')

        if location:
            queryset = queryset.filter(location=location)
        if instrument:
            queryset = queryset.filter(instrument=instrument)
        if genre:
            queryset = queryset.filter(genre=genre)
        if age:
            queryset = queryset.filter(age=age)
        if skill_level:
            queryset = queryset.filter(skill_level=skill_level)

        queryset = queryset.exclude(id=self.request.user.id)

        return queryset.distinct()


class UserRetrieveView(RetrieveAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'


class UserCreateView(CreateAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = UserSignUpSerializer


class UserMeView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserMeSerializer(instance=request.user)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserUpdateSerializer(data=request.data, instance=request.user)
        if serializer.is_valid():
            instance = serializer.save()
            instance_serializer = UserSerializer(instance)
            return Response(instance_serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
