from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.about, name='login'),
    path('about/', views.about, name='about'),
    path('', include('django.contrib.auth.urls')),
    path('', views.index, name='index'),
]