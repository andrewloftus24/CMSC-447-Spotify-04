import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from api.models import Lobby
from api.serializers import UpdateRoomSerializer, GetRoomSerializer, CreateRoomSerializer


class Room(generics.ListAPIView):
    lobbies = Lobby.objects.all()
    serializer_class = GetRoomSerializer

class GetRoom(APIView):
    serializer_class = GetRoomSerializer

    def get(self, request, format=None):
        code = request.GET.get('roomcode', None)
        if code != None:
            match = Lobby.objects.filter(code=code)
            if len(match) > 0:
                data = CreateRoomSerializer(match[0]).data
                current_user = self.request.session.session_key
                data['is_host'] = current_user == match[0].host
                return HttpResponse(data, status=status.HTTP_200_OK)
            return HttpResponse({'Room Code Does Not Match With Open Room': 'Invalid Code'}, status=status.HTTP_404_NOT_FOUND)
        return HttpResponse({'Bad Request': 'Code is None'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get('code')
        if code != None:
            match_result = Lobby.objects.filter(code=code)
            if len(match_result) > 0:
                self.request.session['room_code'] = code
                return HttpResponse({'Success': 'Room Joined'}, status=status.HTTP_200_OK)
            return HttpResponse({'Bad Request': 'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)
        return HttpResponse({'Bad Request': 'Code is None'}, status=status.HTTP_400_BAD_REQUEST)




class CreateRoom(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        r = self.serializer_class(data=request.data)
        if r.is_valid():
            bracket_type = r.data.get('bracket_type')
            max_users = r.data.get('max_users')
            artist = r.data.get('artist')
            room_host = self.request.session.session_key
            match_info = Lobby.objects.filter(host=room_host)
            if match_info.exists():
                match = match_info[0]
                match.bracket_type = bracket_type
                match.max_users = max_users
                match.artist = artist
                match.save(update_fields=['bracket_type', 'max_users', 'artist'])
                self.request.session['room_code'] = match.code
                return HttpResponse(JsonResponse(GetRoomSerializer(match).data), status=status.HTTP_200_OK)
            else:
                match = Lobby(host=room_host, bracket_type=bracket_type, artist=artist, max_users=max_users)
                match.save()
                self.request.session['room_code'] = match.code
                return HttpResponse(JsonResponse(GetRoomSerializer(match).data), status=status.HTTP_201_CREATED)

        return HttpResponse({'Bad Request': 'Room could not be created'}, status=status.HTTP_400_BAD_REQUEST)

class RoomCode(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            code = self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Lobby.objects.filter(host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()

        return HttpResponse({"Message": "You have left the room."}, status=status.HTTP_200_OK)


class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        r = self.serializer_class(data=request.data)
        if r.is_valid():
            bracket_type = r.data.get('bracket_type')
            max_users = r.data.get('max_users')
            artist = r.data.get('artist')
            code = r.data.get('code')

            match_info = Lobby.objects.filter(code=code)
            if not match_info.exists():
                return HttpResponse({'Message': 'Room does not exist.'}, status=status.HTTP_404_NOT_FOUND)

            match = match_info[0]
            if match.host != self.request.session.session_key:
                return HttpResponse({"Message": "You are not the host of this room."}, status=status.HTTP_403_FORBIDDEN)

            match.bracket_type = bracket_type
            match.max_users = max_users
            match.artist = artist
            match.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return HttpResponse(GetRoomSerializer(match).data, status=status.HTTP_201_CREATED)

        return HttpResponse({'Bad Request': "Data is not valid"}, status=status.HTTP_400_BAD_REQUEST)

def sessionKey(request):
    return HttpResponse(request.session.session_key)

@api_view(['GET', 'POST'])
def sessionInfo(request):
    data = CreateRoomSerializer(data=request.data)
    return HttpResponse(data)

@api_view(['GET', 'POST'])
def serializerData(request):
    serializer_class = CreateRoomSerializer

    if not request.session.exists(request.session.session_key):
        request.session.create()

    r = serializer_class(data=request.data)
    if r.is_valid():
        bracket_type = r.data.get('bracket_type')
        max_users = r.data.get('max_users')
        artist = r.data.get('artist')
        room_host = request.session.session_key
        match_info = Lobby.objects.filter(host=room_host)
        if match_info.exists():
            match = match_info[0]
            match.bracket_type = bracket_type
            match.max_users = max_users
            match.artist = artist
            match.save(update_fields=['bracket_type', 'max_users', 'artist'])
            request.session['room_code'] = match.code
            return HttpResponse(GetRoomSerializer(match).data, status=status.HTTP_200_OK)
    return HttpResponse({'Bad Request': 'Room could not be created'}, status=status.HTTP_400_BAD_REQUEST)