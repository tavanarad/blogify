from django.test import TestCase

from authentication import models

class UserModelTest(TestCase):
    
    def setUp(self):
        user = models.User.objects.create_user('Test@local.com', '123',
                username='test')

    def test_create_superuser(self):
        models.User.objects.create_superuser('admin@local.com', '321',
                username='admin')

        admin = models.User.objects.latest('created_at')

        self.assertIsInstance(admin, models.User,
                'Failed to create super user')


    def test_create_user_without_email(self):
        user = None
        try:
            user = models.User.objects.create_user(email=None, password='123', username='no_email')
        except ValueError:
            self.assertIsNone(user, 'Failed to check emial address')
