from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from chat.models import Room, Chat
from .serializers import RoomSerializer, ChatSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

# I wrote this code


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def room_enroll(request):
    all_rooms = Room.objects.filter(
        Q(author=request.user) | Q(friend=request.user)
    ).order_by('-created')

    serializer = RoomSerializer(all_rooms, many=True)

    context = {
        'all_rooms': serializer.data,
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def room(request, room_name, friend_id):
    try:
        room_instance = Room.objects.get(room_id=room_name)
    except Room.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    chats = Chat.objects.filter(room_id=room_instance).order_by('date')

    chat_serializer = ChatSerializer(chats, many=True)

    context = {
        'old_chats': chat_serializer.data,
        'my_name': request.user.username,
        'friend_name': get_object_or_404(User, pk=friend_id).username,
        'room_name': room_name
    }
    return Response(context, status=status.HTTP_200_OK)
# end of code I wrote
