from rest_framework import serializers
from chat.models import Room, Chat


# I wrote this code
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'
# end of code I wrote
