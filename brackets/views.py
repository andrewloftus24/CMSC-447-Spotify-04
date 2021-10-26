from django.http import HttpResponse
from django.shortcuts import render

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