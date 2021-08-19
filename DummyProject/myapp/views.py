from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    html = '<h1> My first web application </h1>'
    return HttpResponse(html)