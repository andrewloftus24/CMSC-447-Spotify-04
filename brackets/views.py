from django.http import HttpResponse
from django.shortcuts import render
import spotipy

# Create your views here.
from brackets.models import Brackets


def index(request):
    names = Brackets.objects.filter()
    context = {
        'names': names,
    }
    return render(request, 'brackets/index.html', context=context)


def about(request):
    abt = Brackets.objects.filter()
    context = {
        'abt': abt,
    }
    return render(request, 'brackets/about.html', context=context)


def login(request):
    log = Brackets.objects.filter()
    context = {
        'log': log,
    }
    return render(request, 'brackets/login.html', context=context)


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


def bracket(request):
    # Setups
    scope = 'user-top-read'
    response = HttpResponse()
    auth_manager = spotipy.oauth2.SpotifyClientCredentials(client_id='',
                                                           client_secret='')
    sp = spotipy.Spotify(auth_manager=auth_manager)
    name = 'Michael Jackson'

    # Get the first artist from results, take their uri
    results = sp.search(q='artist:' + name, type='artist')
    uri = results['artists']['items'][0]['uri']

    # Search that uri for the top 8 songs for the bracket, stored as name in tracks
    results = sp.artist_top_tracks(uri)
    tracks = []
    for x in range(8):
        tracks.append(str(results['tracks'][x]['name']))

    for x in range(8):
        response.write(str(x + 1) + '. ' + tracks[x])
        response.write('<br/>')

    return HttpResponse(response)
