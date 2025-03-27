from django.db import models


class Photo(models.Model):
    title = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='photos/')
    edited_image_name = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        base = f"Photo {self.id}"
        if self.title:
            base += f" - {self.title}"
        if self.edited_image_name:
            base += f" (Edited: {self.edited_image_name})"
        return base