from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.about, name='login'),
    path('about/', views.about, name='about'),
    path('', include('django.contrib.auth.urls')),
    path('logout/', views.logout, name='logout'),
    path('', views.index, name='index'),
    path('bracket/', views.bracket, name='bracket'),
    path('generateLink', views.generateLink, name="generateLink"),
    path('bracket/<str:token>/', views.bracket, name="bracket_shared"),
    path('top50/', views.top50, name='top50')
]