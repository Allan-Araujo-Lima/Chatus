from django.db import models
from django.conf import settings

class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True, db_index=True)
    password = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.id
    
    class Meta: 
        db_table = 't_users'

class Room(models.Model):
    user = models.ForeignKey(
        User, blank=False,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=200)
    messages = models.ManyToManyField('Message', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Message(models.Model):
    user = models.ForeignKey(
        User, blank=False,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"({self.user.first_name}): {self.text}"