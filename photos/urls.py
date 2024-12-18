from django.urls import path
from .views import UploadPhotoView

urlpatterns = [
    path('upload/', UploadPhotoView.as_view(), name='upload_photo'),
]
