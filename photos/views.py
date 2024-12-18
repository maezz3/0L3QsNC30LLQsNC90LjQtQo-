from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Photo
from .serializers import PhotoSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


class UploadPhotoView(APIView):
    def post(self, request, *args, **kwargs):
        # # Проверяем, что файл передан
        # if 'image' not in request.FILES:
        #     return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        #
        # image_file = request.FILES['image']
        #
        # # Проверяем формат файла
        # if not image_file.name.lower().endswith('.jpeg'):
        #     return Response({'error': 'Only JPEG files are allowed'}, status=status.HTTP_400_BAD_REQUEST)
        #
        # # Сохраняем оригинальное изображение
        # photo = Photo(image=image_file)
        # photo.save()
        #
        # # Обрабатываем изображение (здесь можно добавить свою функцию обработки)
        # processed_image_path = self.process_image(photo.image.path)
        #
        # # Возвращаем обработанное изображение
        # with open(processed_image_path, 'rb') as f:
        #     processed_image_data = f.read()
        #
        # return Response(processed_image_data, content_type='image/jpeg')
        if 'image' not in request.FILES:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        image_file = request.FILES['image']

        if not image_file.name.lower().endswith(('.jpg', '.jpeg')):
            return Response({'error': 'Only JPEG files are allowed'}, status=status.HTTP_400_BAD_REQUEST)

        photo = Photo(image=image_file)
        photo.save()

        return Response({'message': 'Image uploaded successfully'}, status=status.HTTP_201_CREATED)

    def process_image(self, image_path):
        # Здесь можно добавить свою функцию обработки изображения
        # Например, изменение размера, фильтры и т.д.
        # Пока просто возвращаем оригинальное изображение
        return image_path
