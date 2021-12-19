import random
import string

import django
from django.core import serializers
from django.shortcuts import redirect

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import spotipy
import json

from rest_framework.views import APIView

from brackets.models import Votes
from spotifytournament.credentials import SPOT_SECRET, SPOT_KEY

from rest_framework.decorators import api_view


def index(request):
    return render(request, 'brackets/index.html', context=None)

def about(request):
    return render(request, 'brackets/about.html', context=None)

def login(request):
    return render(request, 'brackets/login.html', context=None)

def bracket(request):
    return render(request, 'brackets/bracket.html', context=None)

def logout(request):
    django.contrib.auth.logout(request)
    return redirect('/')

def getUser(request):
    return HttpResponse(request.session.session_key)

def top50(request):
    scope = 'user-top-read'
    response = HttpResponse()

    auth_manager = spotipy.oauth2.SpotifyClientCredentials(client_id=SPOT_KEY,
                                                           client_secret=SPOT_SECRET)
    sp = spotipy.Spotify(auth_manager=auth_manager)

    playlists = sp.user_playlists('spotify')
    for x in range(50):
        response.write(playlists['items'][x]['description'])
        response.write('</br>')

    return HttpResponse(response)

@api_view(['GET', 'POST'])
def topTracks(request):
    # Setups
    scope = 'user-top-read'
    response = HttpResponse()
    auth_manager = spotipy.oauth2.SpotifyClientCredentials(client_id=SPOT_KEY,
                                                           client_secret=SPOT_SECRET)
    sp = spotipy.Spotify(auth_manager=auth_manager)
    name = request.GET.get('artist', None)
    if name is not None:
        # Get the first artist from results, take their uri
        results = sp.search(q='artist:' + name, type='artist')
        uri = results['artists']['items'][0]['uri']

        # Search that uri for the top 8 songs for the bracket, stored as name in tracks
        results = sp.artist_top_tracks(uri)

    tracks = []
    number_tracks = int(request.GET.get('num', 8))
    if number_tracks > 10:
        number_tracks = 10
    for x in range(number_tracks):
        if name is None:
            tracks.append("Enter an artist")
        else:
            tracks.append(str(results['tracks'][x]['name']))
        if "Remaster" in tracks[x]:
            index = tracks[x].index('-')
            tracks[x] = tracks[x][0:index-1]

    response = json.dumps(tracks)
    # host_name is the session_key for the user
    # will use for host name and bracket name in DB, as host can only have one bracket at a time

    return HttpResponse(response)

@api_view(['GET', 'POST'])
def getPlaylistNames(request):
    # Setups
    scope = 'playlist-read-collaborative'
    response = HttpResponse()
    auth_manager = spotipy.oauth2.SpotifyClientCredentials(client_id=SPOT_KEY,
                                                           client_secret=SPOT_SECRET)
    sp = spotipy.Spotify(auth_manager=auth_manager)
    # Search that uri for the top 8 songs for the bracket, stored as name in tracks
    playlists = sp.user_playlists(request.user.username)
    playlist_dict = {'playlists': None}
    playlist_list = []
    for x in range(len(playlists['items'])):
        playlist_list.append(playlists['items'][x]['name'])

    playlist_dict['playlists'] = playlist_list
    return JsonResponse(playlist_dict)

def getPlaylistItems(request):
    # Setups
    scope = 'playlist-read-collaborative'
    response = HttpResponse()
    auth_manager = spotipy.oauth2.SpotifyClientCredentials(client_id=SPOT_KEY,
                                                           client_secret=SPOT_SECRET)
    sp = spotipy.Spotify(auth_manager=auth_manager)
    # Search that uri for the top 8 songs for the bracket, stored as name in tracks
    playlist = request.GET.get('artist')
    playlist_id = 0
    playlist_dict = {'tracks': None}
    playlist_list = []
    if playlist is not None:
        playlists = sp.user_playlists(request.user.username)
        for x in range(len(playlists['items'])):
            if playlists['items'][x]['name'] == playlist:
                playlist_id = playlists['items'][x]['id']
                break

        tracks = sp.playlist_tracks(playlist_id=playlist_id)

        for x in range(8):
           playlist_list.append(tracks['items'][x]['track']['name'])

        response = json.dumps(playlist_list)
        return HttpResponse(response)

@api_view(['GET', 'POST'])
def startVotes(request):

    Votes.objects.all().delete()

    return HttpResponse("Initialized")

@api_view(['GET', 'POST'])
def updateVotes(request):
    username = request.user.first_name

    resetVotes(request)

    if request.method == "POST":
        songs = request.data.get('songs')
        votes = request.data.get('votes')

        vote_dict = {'votes': None}
        vote_list = []

        for i in range(len(votes)):
            new_vote = Votes(user=username, vote=votes[i], song_id=songs[i])
            new_vote.save()
            vote_list.append(0)

        vote_dict['votes'] = vote_list

        return JsonResponse(vote_dict)

    return HttpResponse("Invalid")

def getVotes(request):
    room_list = []
    room_dict = {'data': None}
    song_list = []
    vote_list = []

    user_votes = Votes.objects.all()
    vote_dict = {}

    num_songs = int(request.GET.get('num'))

    for i in range(len(user_votes)):
        if i % num_songs == 0:
            vote_dict = {'user': user_votes[i].user, 'winners': None, 'votes': None}
            vote_list = []
            song_list = []
        vote_list.append(user_votes[i].vote)
        if user_votes[i].vote == 1:
            song_list.append(user_votes[i].song_id)

        if i % num_songs == (num_songs - 1):
            vote_dict['votes'] = vote_list
            vote_dict['winners'] = song_list
            room_list.append(vote_dict)

    room_dict['data'] = room_list

    return JsonResponse(room_dict)

def resetVotes(request):
    username = request.user.first_name

    Votes.objects.filter(user=username).delete()

    return HttpResponse("Deleted")
