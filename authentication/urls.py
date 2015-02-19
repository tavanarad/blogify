from django.conf.urls import url, patterns

from rest_framework import routers

from authentication import views

router = routers.SimpleRouter()
router.register(r'user', views.UserViewSet)

urlpatterns = patterns('',
        url(r'^', router.urls),
        )
