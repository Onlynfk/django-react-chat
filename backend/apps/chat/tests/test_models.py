from django.test import TestCase
from apps.authentication.models import User
from chat.models import Room, Chat


class RoomModelTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(username='user1')
        self.user2 = User.objects.create(username='user2')
        self.room = Room.objects.create(sender=self.user1, reciever=self.user2)

    def test_room_str_representation(self):
        self.assertEqual(str(self.room), f"{self.room.room_id}-{self.user1}-{self.user2}")

class ChatModelTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(username='user1')
        self.user2 = User.objects.create(username='user2')
        self.room = Room.objects.create(sender=self.user1, reciever=self.user2)
        self.chat = Chat.objects.create(room_id=self.room, sender=self.user1, reciever=self.user2, text='Hello!')

    def test_chat_str_representation(self):
        expected_str = f"{self.chat.id} - {self.chat.date}"
        self.assertEqual(str(self.chat), expected_str)
