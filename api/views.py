import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from api.models import Lobby, User
from api.serializers import GetRoomSerializer, CreateRoomSerializer, UserSerializer

from django.contrib.auth import get_user_model

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
                current_user = self.request.user.first_name
                data['is_host'] = current_user == match[0].host
                return HttpResponse(JsonResponse(data), status=status.HTTP_200_OK)
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
                users = User.objects.create(host=match_result[0], name=self.request.user.first_name)
                users.save()
                self.request.session['room_code'] = code
                return HttpResponse({'Room Joined': 'Good Job'}, status=status.HTTP_200_OK)
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
            song_type = r.data.get('song_type')
            max_users = r.data.get('max_users')
            #playlist = r.data.get('playlist')
            artist = r.data.get('artist')
            room_host = self.request.user.first_name
            match_info = Lobby.objects.filter(host=room_host)
            if match_info.exists():
                match = match_info[0]
                match.bracket_type = bracket_type
                match.song_type = song_type
                match.max_users = max_users
                #match.playlist = playlist
                match.artist = artist
                User.objects.all().delete()
                users = User.objects.create(host=match, name=room_host)
                users.save()
                match.save(update_fields=['bracket_type', 'max_users', 'song_type', 'artist'])
                self.request.session['room_code'] = match.code
                return HttpResponse(JsonResponse(GetRoomSerializer(match).data), status=status.HTTP_200_OK)
            else:
                match = Lobby(host=room_host, bracket_type=bracket_type, song_type=song_type, artist=artist, max_users=max_users)
                match.save()
                User.objects.all().delete()
                users = User.objects.create(host=match, name=room_host)
                users.save()
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

class GetPlayerList(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.GET.get('code')
        if code != None:
            match = Lobby.objects.filter(code=code)
            if match.exists():
                users = User.objects.filter(host=match[0].host)
                return HttpResponse(len(users))


class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            code = self.request.session.pop('room_code')
            host_id = self.request.user.first_name
            room_results = Lobby.objects.filter(host=host_id)
            if len(room_results) > 0:
                User.objects.all().delete()
                room = room_results[0]
                room.delete()

        return HttpResponse({"Message": "You have left the room."}, status=status.HTTP_200_OK)

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

@api_view(['GET', 'POST'])
def testUsers(request):
    code = request.GET.get('code')
    if code != None:
        match = Lobby.objects.filter(code=code)
        if match.exists():
            users = User.objects.filter(host=match[0].host)
            userDict = {'users': None}
            userList = []
            for user in users:
                userList.append(user.name)
            userDict['users'] = userList
            return HttpResponse(JsonResponse(userDict))

    return HttpResponse({'Bad Request': 'Room could not be created'}, status=status.HTTP_400_BAD_REQUEST)
