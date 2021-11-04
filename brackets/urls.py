from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.about, name='login'),
    path('about/', views.about, name='about'),
    path('', include('django.contrib.auth.urls')),
    path('', views.index, name='index'),
    path('bracket/', views.bracket, name='bracket'),
    path('top50/', views.top50, name='top50')
]