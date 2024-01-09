from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListAPIView.as_view(), name='user-list'),
    path('user/', views.UserAPIView.as_view(), name="user-details-update"),
    path('change-password/', views.ChangePasswordView.as_view(),
         name='user_change_password'),




]
