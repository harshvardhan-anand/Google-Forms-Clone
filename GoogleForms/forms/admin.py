from django.contrib import admin
from . models import Form, FormInfo, Questions, Choice

# Register your models here.
admin.site.register(Form) # Not Req
admin.site.register(FormInfo)
admin.site.register(Questions)
admin.site.register(Choice)