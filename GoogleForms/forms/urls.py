from django.urls import path
from . import views

app_name = 'forms'

urlpatterns = [
    path('', views.home, name='home'),
    path('create/', views.create, name='create_form'),
    path('<int:pk>/form/', views.update_form, name='update_form')
]