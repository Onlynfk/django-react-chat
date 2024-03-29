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
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


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

        try:
            reciever = User.objects.get(id=reciever_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        room = Room.objects.filter(
            Q(sender=request.user, reciever=reciever) | Q(sender=reciever, reciever=request.user)
        ).first()

        if not room:
            room = Room.objects.create(sender=request.user, reciever=reciever)
            room.save()
            serializer = RoomSerializer(room, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        serializer = RoomSerializer(room, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateHasSeenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id, receiver_id):
        try:
            try:
                room_instance = Room.objects.get(room_id=room_id)
            except Room.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            channel_layer = get_channel_layer()
            room_group_name = "chat_%s" % room_id

            # Your logic to validate the room and receiver goes here
            chats = Chat.objects.filter(room_id=room_instance, has_seen=False).order_by("-date")
            receiver_chats = chats.filter(Q(sender=receiver_id) | Q(reciever=receiver_id))
            print("receiver_chats", receiver_chats)
            for chat in receiver_chats:
                message = {
                    "type": "chatroom_message",
                    "text": chat.text,
                    "receiver": chat.reciever.id,
                    "date": chat.date.isoformat(),
                    "has_seen": chat.has_seen,
                    "sender": chat.sender.id,
                    "slug": chat.slug,
                    "read_receipt":"read_receipt"
                }
                chat.has_seen = True  # Update 'has_seen' as needed
                chat.save()
                # Send message to the WebSocket consumer
                async_to_sync(channel_layer.group_send)(room_group_name, message)

            return Response({'detail': 'Read receipt sent successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)