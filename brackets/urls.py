from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path('login/', views.about),
    path('about/', views.about),
    path('', include('django.contrib.auth.urls')),
    path('logout/', views.logout),
    path('', views.index),
    path('bracket/', views.bracket),
    path('api/userinfo/', views.getUserInformation),
    path('api/authenticated/', views.getUserAuthenticated),
    path('api/toptracks/', views.topTracks),
    path('api/playlists/', views.getPlaylistNames),
    path('api/playlisttracks/', views.getPlaylistItems),
    path('api/albumtracks/', views.getAlbumTracks),
    path('api/gettracks/', views.getTracks),
    path('api/top50/', views.top50),
    path('join/', views.bracket),
    path('create/', views.bracket),
    path('room/<str:roomCode>', views.bracket),
    path('api/initvotes/', views.startVotes),
    path('api/reset/', views.resetVotes),
    path('api/updatevotes/', views.updateVotes),
    path('api/getvotes/', views.getVotes)
]