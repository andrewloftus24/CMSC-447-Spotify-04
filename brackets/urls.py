from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path('login/', views.about),
    path('about/', views.about),
    path('', include('django.contrib.auth.urls')),
    path('logout/', views.logout),
    path('', views.index),
    path('bracket/', views.bracket),
    path('bracket/<str:token>/', views.bracket),
    re_path(r'^api/toptracks/', views.topTracks),
    re_path(r'^api/getuser/', views.getUser),
    path('join/', views.bracket),
    path('create/', views.bracket),
    path('room/<str:roomCode>', views.bracket)
]