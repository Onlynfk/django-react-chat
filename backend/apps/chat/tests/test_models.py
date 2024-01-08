from django.test import TestCase
from django.contrib.auth.models import User
from chat.models import Room, Chat


class RoomModelTestCase(TestCase):
    def setUp(self):
        # Create two test users
        self.user1 = User.objects.create_user(
            username='user1',
            password='user1password'
        )
        self.user2 = User.objects.create_user(
            username='user2',
            password='user2password'
        )

        # Create a test room
        self.room = Room.objects.create(
            author=self.user1,
            friend=self.user2,
        )

    def test_room_str_representation(self):
        # Check the __str__ representation of a room
        expected_str = f"{self.room.room_id}-{self.user1}-{self.user2}"
        self.assertEqual(str(self.room), expected_str)

    def test_room_author_friend_relationship(self):
        # Check if the author and friend relationships are correctly set
        self.assertEqual(self.room.author, self.user1)
        self.assertEqual(self.room.friend, self.user2)


class ChatModelTestCase(TestCase):
    def setUp(self):
        # Create two test users
        self.user1 = User.objects.create_user(
            username='user1',
            password='user1password'
        )
        self.user2 = User.objects.create_user(
            username='user2',
            password='user2password'
        )

        # Create a test room
        self.room = Room.objects.create(
            author=self.user1,
            friend=self.user2,
        )

        # Create a test chat message
        self.chat = Chat.objects.create(
            room_id=self.room,
            author=self.user1,
            friend=self.user2,
            text='This is a test message.',
        )

    def test_chat_str_representation(self):
        # Check the __str__ representation of a chat message
        expected_str = f"{self.chat.id} - {self.chat.date}"
        self.assertEqual(str(self.chat), expected_str)

    def test_chat_author_friend_relationship(self):
        # Check if the author and friend relationships are correctly set
        self.assertEqual(self.chat.author, self.user1)
        self.assertEqual(self.chat.friend, self.user2)

    def test_chat_has_seen_default_value(self):
        # Check if the default value of 'has_seen' is False
        self.assertFalse(self.chat.has_seen)
