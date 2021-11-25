from django.urls import path
from . import views

urlpatterns = [
    path('lobby/', views.Room.as_view()),
    path('start-room/', views.CreateRoom.as_view()),
    path('get-room/', views.GetRoom.as_view()),
    path('join-room/', views.JoinRoom.as_view()),
    path('leave/', views.LeaveRoom.as_view()),
    path('room-code/', views.RoomCode.as_view()),
    path('session-exists/', views.sessionKey),
    path('session-info/', views.sessionInfo),
    path('ser/', views.serializerData),
    path('users/', views.GetPlayerList.as_view())
]