from rest_framework import serializers
from api.models import Lobby


class GetRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lobby
        fields = ['code', 'host', 'bracket_type', 'max_users', 'artist']

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lobby
        fields = ['bracket_type', 'max_users', 'artist']

class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Lobby
        fields = ['bracket_type', 'max_users', 'artist']