from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Photo(models.Model):
    title = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='photos/')
    edited_image_name = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='photos')

    def __str__(self):
        return f"{self.title} (User: {self.user.username})"
