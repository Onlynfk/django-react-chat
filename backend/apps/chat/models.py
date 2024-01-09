from django.db import models
from apps.authentication.models import User


class Room(models.Model):
    # room_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, related_name='sender', on_delete=models.CASCADE)
    reciever = models.ForeignKey(User, related_name='reciever', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.room_id}-{self.sender}-{self.reciever}"


class Chat(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='chats')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_msg')
    reciever = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_msg')
    text = models.TextField()
    slug = models.CharField(max_length=300, unique=True, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    has_seen = models.BooleanField(default=False)

    def __str__(self):
        return '%s - %s' % (self.id, self.date)
