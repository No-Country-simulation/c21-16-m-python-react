from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserEmailSerializer
from django.contrib.auth import get_user_model
from .serializers import LoginEmailSerializer
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


CustomUser = get_user_model()


class RegisterEmailViewSet(viewsets.ModelViewSet):
    serializer_class = UserEmailSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        if request.data.get('is_oauth_user', False):
            return Response({'error': 'Cannot register as an OAuth user.'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        if CustomUser.objects.filter(email=request.data.get('email')).exists():
            return Response({'error': 'User already exists.'}, status=status.HTTP_409_CONFLICT)

        if CustomUser.objects.filter(username=request.data.get('username')).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_409_CONFLICT)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginEmailViewSet(viewsets.ViewSet):
    serializer_class = LoginEmailSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        user.last_login = timezone.now()
        user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

