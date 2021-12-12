from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse_lazy
from django.http import Http404, JsonResponse
from .utils import Form
import json

# Create your views here.

form = Form()

def get_random_uuid():
    return 'my_simple_uuid'

def home(request):
    forms = form.findall()
    return render(request, 'home.html', {
        'forms':forms
    })

def create(request):
    pk = form.create()
    return HttpResponseRedirect(reverse_lazy('forms:update_form', args=[pk]))

def update_form(request, pk):

    if request.method == 'POST':
        form_data = json.loads(request.body)
        form.update(pk, form_data)
        return JsonResponse({
            'saved':'OK'
        })
        print(data)

    try:
        form_data = form.find(pk)
        return render(request, 'update_form.html', {
            'pk':pk,
            'form':form_data
        })
    except Exception as e:
        print(e)
        raise Http404('Form not found')

def get_response_from_user(request, pk):
    if request.method == 'POST':
        cd = dict(request.POST)
        del cd['csrfmiddlewaretoken']
        response = {}
        for key, value in cd.items():
            print(key, value[0])
            response.update({
                f"responses.{key}.{value[0]}":1
            })
        form.update_response(pk, response)
        return render(request, 'thankyou.html')
    else:
        try:
            form_data = form.find(pk)
            return render(request, "get_response_from_user.html",{
                'pk':pk,
                'form_data':form_data
            })
        except:
            raise Http404('Form not found')