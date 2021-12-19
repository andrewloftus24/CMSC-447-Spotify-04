from rest_framework import serializers
from api.models import Lobby, User


class GetRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lobby
        fields = ['code', 'host', 'bracket_type', 'song_type', 'playlist', 'max_users', 'artist']

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lobby
        fields = ['bracket_type', 'song_type', 'playlist', 'max_users', 'artist']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name']