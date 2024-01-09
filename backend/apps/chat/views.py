from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from apps.chat.models import Room, Chat
from .serializers import RoomSerializer, ChatSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from apps.authentication.models import User


class RoomListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        all_rooms = Room.objects.filter(Q(sender=request.user) | Q(reciever=request.user)).order_by("-created")

        serializer = RoomSerializer(all_rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RoomAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, room_id, receiver_id, *args, **kwargs):
        try:
            room_instance = Room.objects.get(room_id=room_id)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        chats = Chat.objects.filter(room_id=room_instance).order_by("date")

        chat_serializer = ChatSerializer(chats, many=True)

        context = {
            "old_chats": chat_serializer.data,
            "my_name": request.user.first_name,
            "reciever_name": get_object_or_404(User, pk=receiver_id).first_name,
            "room_id": room_id,
        }
        return Response(context, status=status.HTTP_200_OK)


class RoomChoiceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, reciever_id, *args, **kwargs):
        print("reciever_id", reciever_id)

        try:
            reciever = User.objects.get(id=reciever_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        room = Room.objects.filter(
            Q(sender=request.user, reciever=reciever_id) | Q(sender=reciever_id, reciever=request.user)
        )
        if not room:
            room = Room.objects.create(sender=request.user, reciever=reciever)
            room.save()
            serializer = RoomSerializer(room, many=True)
            
        serializer = RoomSerializer(room, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateHasSeenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id, receiver_id):
        try:
            room_instance = Room.objects.get(room_id=room_id)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        chats = Chat.objects.filter(room_id=room_instance, has_seen=False).order_by("date")
        receiver_chats = chats.filter(Q(sender=receiver_id) | Q(reciever=receiver_id))
        for chat in receiver_chats:
            chat.has_seen = True  # Update 'has_seen' as needed
            chat.save()
        return Response({"message": "has_seen updated successfully"}, status=status.HTTP_200_OK)
