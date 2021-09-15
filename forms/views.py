# Djongo - https://www.freecodecamp.org/news/using-django-with-mongodb-by-adding-just-one-line-of-code-c386a298e179/
# PyMongo - https://www.w3schools.com/python/python_mongodb_getstarted.asp

from django.shortcuts import render, HttpResponseRedirect
from django.http import JsonResponse, Http404
from django.urls import reverse_lazy
import json
from .utils import Form

# Create your views here.

form = Form()

def home(request):
    forms = form.find_all()
    return render(request, 'home.html', {
        'forms':forms
    })

def create(request):
    pk = form.create()
    return HttpResponseRedirect(reverse_lazy('forms:update_form', args=[pk]))

def update_form(request, pk):
    if request.method=='POST':
        form_data = json.loads(request.body)
        form.update(pk, form_data)
        return JsonResponse({
            'saved':'OK'
        })
    else:
        try:
            form_data = form.find(pk)
            return render(request, 'update_form.html', {
                'pk':pk,
                'form':form_data,
            })
        except Exception as e:
            print(e)
            raise Http404('Form Not Found')

def get_response_frm_user(request, pk):
    if request.method=='POST':
        # print(request.POST)
        cd = dict(request.POST)
        del cd['csrfmiddlewaretoken']
        print(cd)
        response={}
        for key, value in cd.items():
            # How increment statement is expected by MongoDB - https://docs.mongodb.com/manual/reference/operator/update/inc/
            # {'$inc':{someKey.anotherKeyInside:incrementValue}}
            response.update({
                f"responses.{key}.{value[0]}":1
            })

        form.update_response(pk, response)
        return render(request, 'thankyou.html')
        
    else:
        try:
            form_data = form.find(pk)
            return render(request, 'get_response_frm_user.html', {
                'pk':pk,
                'form_data':form_data
            })
        except Exception as e:
            print(e)
            raise Http404('Form not found')

def responses(request, pk):
    form_data = form.find(pk)
    # print(form_data)
    return render(request, 'responses.html', {
        'form_data':form_data,
    })
