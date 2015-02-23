from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication import models


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = models.User
        fields = ('id', 'email', 'username', 'name', 'created_at', 'updated_at',
                'last_login', 'password', 'confirm_password',)
        read_only_field = ('created_at', 'updated_at', 'last_login',)

    def create(self, validated_data):
        return models.User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)

        instance.save()

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

        update_session_auth_hash(self.context.get('request'), instance)

        return instance;
