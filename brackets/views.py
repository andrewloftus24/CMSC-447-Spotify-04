import random
import string

import django
from django.http import HttpResponse
from django.shortcuts import render, redirect

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