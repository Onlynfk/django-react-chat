from apps.chat.models import Chat, Room
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from apps.authentication.models import User
from django.db import IntegrityError

"""MESSAGE DB ENTRY"""


def create_new_message_sync(me, reciever, message, room_id, slug):
    try:
        get_room = Room.objects.filter(room_id=room_id).first()
        sender = User.objects.filter(id=me).first()
        reciepent = User.objects.filter(id=reciever).first()

        new_chat = Chat.objects.create(room_id=get_room, slug=slug, sender=sender, reciever=reciepent, text=message)
        new_chat.save()

    except IntegrityError as e:
        print(f"IntegrityError occurred: {e}")
        # Handle IntegrityError as needed, e.g., log the error or take appropriate action

    except Exception as e:
        print(f"An error occurred: {e}")


# Convert the synchronous function to asynchronous
create_new_message = sync_to_async(create_new_message_sync, thread_sensitive=False)


class ChatRoomConsumer(AsyncWebsocketConsumer):

    """Connect"""

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    """Disconnect"""

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    """Receive"""

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print("text_data_json", text_data_json)
        text = text_data_json["text"]
        receiver = int(text_data_json["receiver"])
        sender = int(text_data_json["sender"]["id"])
        date = text_data_json["date"]
        slug = text_data_json["slug"]
        has_seen = text_data_json["has_seen"]

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chatroom_message",
                "text": text,
                "receiver": receiver,
                "date": date,
                "has_seen": has_seen,
                "sender": sender,
                "slug": slug,
            },
        )

    """Messages"""

    async def chatroom_message(self, event):
        message = event["text"]
        receiver = event["receiver"]
        date = event["date"]
        has_seen = event["has_seen"]
        sender = event["sender"]
        text = event["text"]
        slug = event["slug"]

        # Use the asynchronous version of create_new_message
        await create_new_message(me=sender, reciever=receiver, message=message, room_id=self.room_name, slug=slug)

        await self.send(
            text_data=json.dumps(
                {
                    "message": message,
                    "receiver": receiver,
                    "date": date,
                    "has_seen": True,
                    "text": text,
                    "sender": {"id": sender},
                    "slug": slug,
                }
            )
        )
