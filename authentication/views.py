from django.utils.translation import gettext_lazy as _

from rest_framework import permissions, viewsets, status
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
            'message': _('User could not be created with received data.')
            }, status=status.HTTP_400_BAD_REQUEST)

        
