from django.urls import path
from . import views

app_name = 'myapp'

urlpatterns = [
    path('profile/', views.profile, name='profile')
]