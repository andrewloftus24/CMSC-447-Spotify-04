from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.about, name='login'),
    path('about/', views.about, name='about'),
    path('', include('django.contrib.auth.urls')),
    path('', views.index, name='index'),
    path('make_bracket/', views.make_bracket, name='Make_bracket'),
    path('view_bracket/', views.view_bracket, name='View_bracket')
]