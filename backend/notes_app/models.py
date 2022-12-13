from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title}'
