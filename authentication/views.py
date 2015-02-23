from django.contrib.auth import authenticate, login, logout
from django.utils.translation import gettext_lazy as _

from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response

from authentication import models
from authentication import serializers
from authentication.permissions import IsUserOwner


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsUserOwner(), )

    def create(self, request):
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            models.User.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': _('Bad Request'),
            'message': _('User could not be created with received data.' + str(serializer.errors) )
            }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):

    def post(self, request):

        data = request.data

        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(email=email, password=password)

        if user:
            if user.is_active:
                login(request, user)

                serializer = serializers.UserSerializer(user)
                return Response(serializer.data)
            else:
                return Response({
                    'status': _('Unauthorized'),
                    'message': _('This user has been disabled')
                    }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': _('Unauthorized'),
                'message': _('Email or password is incorrect')
                }, status = status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
