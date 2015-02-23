from django.conf.urls import url, patterns, include

from rest_framework import routers

from authentication import views

router = routers.SimpleRouter()
router.register(r'user', views.UserViewSet)

urlpatterns = patterns('',
        url(r'^', include(router.urls)),
        url(r'^login/$', views.LoginView.as_view(), name='login'),
        url(r'^logout/$', views.LogoutView.as_view(), name='logout'),
        )
