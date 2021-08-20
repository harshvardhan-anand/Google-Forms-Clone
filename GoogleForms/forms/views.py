from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse_lazy
from . models import Form

# Create your views here.
def home(request):
    return render(request, 'home.html')

def create(request):
    form = Form.objects.create()
    return HttpResponseRedirect(reverse_lazy('forms:update_form', args=[form.pk]))

def update_form(request, pk):
    print(request.POST)
    return render(request, 'update_form.html', context={'pk':pk})
