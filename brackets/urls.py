from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.about, name='login'),
    path('about/', views.about, name='about'),
    path('', views.index, name='index'),
]