from django.db import models

# Create your models here.
class Form(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class FormInfo(models.Model):
    form = models.OneToOneField(Form, on_delete=models.CASCADE, related_name='info')
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)

class Questions(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='questions')
    question_order = models.IntegerField(default=1)
    question = models.TextField()
    total_responses = models.IntegerField(default=0)

class Choice(models.Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE, related_name='choices')
    is_answer = models.BooleanField(default=False)
    # is_radio = models.BooleanField(default=True)
    # is_checkbox = models.BooleanField(default=False)
    # is_short_ans = models.BooleanField(default=False)
    correct = models.IntegerField(default=0)