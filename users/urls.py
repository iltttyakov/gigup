from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from . import views

urlpatterns = [
    path(
        'token/obtain/',
        views.TokenObtainPairViewWithInfo.as_view(),
        name='token_obtain_pair'
    ),
    path(
        'token/refresh/',
        jwt_views.TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    path(
        'signup/',
        views.UserCreateView.as_view(),
        name='user_signup'
    ),
    path(
        'me/',
        views.UserMeView.as_view(),
        name='user_me'
    ),
    path('users/', views.UserListView.as_view()),
    path('users/<int:id>', views.UserRetrieveView.as_view()),
    path('genres/', views.GenreListView.as_view()),
    path('instruments/', views.InstrumentListView.as_view()),
]
