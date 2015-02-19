from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError(_('Users must have a valid email address.'))
        
        if not kwargs.get('username'):
            raise ValueError(_('Users must have a valid username.'))

        user = self.model(
                email = self.normalize_email(email), username=kwargs.get('username')
                )

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(email, password, **kwargs)

        user.is_admin = True
        user.save()

        return user


class User(AbstractBaseUser):
    
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    name = models.CharField(max_length=80, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def get_name(self):
        return self.name


