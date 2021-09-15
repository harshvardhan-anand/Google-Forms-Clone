# from djongo import models

# # Create your models here.
# class Choice(models.Model):
#     choice = models.TextField()
#     responses_per_choice = models.IntegerField(default=0)


# class Question(models.Model):
#     question = models.TextField()
#     choices = models.ArrayField(Choice)
#     response_per_question = models.IntegerField(default=0)

#     class Meta:
#         abstract = True


# class Form(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     form_data = models.EmbeddedField(Question)

#     def __str__(self):
#         return f'{self.title}'


