import random
import string

import django
from django.shortcuts import redirect

from django.http import HttpResponse
from django.shortcuts import render
import spotipy
import json
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

    auth_manager = spotipy.oauth2.SpotifyClientCredentials(client_id='',
                                                           client_secret='')
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
