# photos/views.py
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Photo
from .serializers import PhotoSerializer, UserSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
import os
from datetime import datetime

User = get_user_model()


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Photo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        image_file = self.request.FILES.get('image')
        if not image_file:
            raise serializers.ValidationError({"image": "No image provided"})

        original_name, ext = os.path.splitext(image_file.name)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        edited_image_name = f"{original_name}_edited_{timestamp}{ext}"

        serializer.save(
            user=self.request.user,
            edited_image_name=edited_image_name
        )


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data.get('email', ''),
                password=serializer.validated_data['password']
            )
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer