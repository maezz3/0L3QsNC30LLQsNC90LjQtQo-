from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'title', 'image', 'edited_image_name', 'uploaded_at']
        read_only_fields = ['uploaded_at', 'edited_image_name']

    def validate_image(self, value):
        if not value.name.lower().endswith(('.jpg', '.jpeg', '.png')):
            raise serializers.ValidationError("Only JPG/JPEG/PNG files are allowed.")
        return value
