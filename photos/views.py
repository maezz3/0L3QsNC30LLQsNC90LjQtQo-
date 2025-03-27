from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Photo
from .serializers import PhotoSerializer
import os
from datetime import datetime


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        image_file = request.FILES.get('image')
        if not image_file:
            return Response(
                {'error': 'No image provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Создаем новое имя для измененного файла
        original_name, ext = os.path.splitext(image_file.name)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        edited_image_name = f"{original_name}_edited_{timestamp}{ext}"

        photo = Photo(
            title=request.data.get('title', ''),
            image=image_file,
            edited_image_name=edited_image_name  # Сохраняем название измененного файла
        )
        photo.save()

        # Здесь можно добавить обработку изображения
        # После обработки можно обновить edited_image_name, если нужно
        # self.process_image(photo.image.path)

        return Response(
            {
                'message': 'Image uploaded successfully',
                'id': photo.id,
                'original_image': photo.image.name,
                'edited_image_name': photo.edited_image_name
            },
            status=status.HTTP_201_CREATED
        )

    def process_image(self, image_path):
        """Метод обработки изображения"""
        # Здесь можно реализовать изменение изображения
        # и обновить edited_image_name, если нужно
        return image_path
