from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse_lazy
from django.http import Http404
from .utils import Form

# Create your views here.

form = Form()

def get_random_uuid():
    return 'my_simple_uuid'

def home(request):
    return render(request, 'home.html')

def create(request):
    pk = form.create()
    return HttpResponseRedirect(reverse_lazy('forms:update_form', args=[pk]))

def update_form(request, pk):
    if request.method=='POST':
        data = request.POST
        print(data)
        print(data['inputText'])
        print(data.getlist('inputText')[0])
    try:
        form_data = form.find(pk)
        return render(request, 'update_form.html', {
            'pk':pk,
            'form':form_data
        })
    except Exception as e:
        print(e)
        raise Http404('Form not found')