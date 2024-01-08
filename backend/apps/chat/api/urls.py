from django.urls import path
from . import views

urlpatterns = [
    path('', views.RoomEnrollAPIView.as_view(), name='api-room-enroll'),
    path('room/<str:room_name>/<int:reciever_id>/', views.RoomAPIView.as_view(), name='room-api'),   
]
