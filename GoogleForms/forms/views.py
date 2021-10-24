from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse_lazy

# Create your views here.

def get_random_uuid():
    return 'my_simple_uuid'

def home(request):
    return render(request, 'home.html')

def create(request):
    pk = get_random_uuid()
    return HttpResponseRedirect(reverse_lazy('forms:update_form', args=[pk]))

def update_form(request, pk):
    return render(request, 'update_form.html')