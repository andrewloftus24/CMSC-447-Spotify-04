<<<<<<< HEAD
import random
import string

import django
from django.http import HttpResponse
from django.shortcuts import render, redirect

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import spotipy


# Create your views here.
from django.urls import reverse

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


def bracket(request, access_code=0):

    return render(request, 'brackets/bracket.html', context=None)

def generateOTT():
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(10))

def generateLink(request):
    token = generateOTT()
    ShareableLink.objects.create(shareCode=token)
    return HttpResponse('<a href="/bracket/{}">{}{}</a>'.format(token, request.build_absolute_uri(), token))

def logout(request):
    django.contrib.auth.logout(request)
    return redirect('/')


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


def bracket(request, artist_name):
    # Setups
    scope = 'user-top-read'
    response = HttpResponse()
    auth_manager = spotipy.oauth2.SpotifyClientCredentials(client_id='f14faa95f781483da8d47a43edc9882b',
                                                           client_secret='9d732406270743ff97d5acf2300962cd')
    sp = spotipy.Spotify(auth_manager=auth_manager)
    name = artist_name

    # Get the first artist from results, take their uri
    results = sp.search(q='artist:' + name, type='artist')
    uri = results['artists']['items'][0]['uri']

    # Search that uri for the top 8 songs for the bracket, stored as name in tracks
    results = sp.artist_top_tracks(uri)
    tracks = []
    for x in range(10):
        tracks.append(str(results['tracks'][x]['name']))

    #track_names = Brackets.objects.filter()
    #context = {
    #   "name": track_names,
    #}

    #for x in range(10):
    #    response.write(str(x + 1) + '. ' + tracks[x])
    #    response.write('<br/>')

    #return HttpResponse(response)
    return tracks

def top_artists(request):
    names = Brackets.objects.filter()
    context = {
        'names': names,
    }
    return render(request, 'brackets/bracket.html', context=context)

def search_artist(request):
    artist = request.POST.get('artist', 'none')
    tracks = bracket(request, artist)
    for track in tracks:
        x = Brackets(song_name=track)
        x.save()
    return HttpResponseRedirect(reverse('bracket'))


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
