from django.urls import path
from .views import PhotoViewSet

urlpatterns = [
    path('upload/', PhotoViewSet.as_view({'post': 'create'}), name='upload-photo'),
]
