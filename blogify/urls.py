from django.conf.urls import patterns, include, url
from django.contrib import admin

from authentication import urls as auth_urls
from blogify import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'blogify.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^api/auth/', include(auth_urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^home/$', views.HomeView.as_view(), name='home'),
    url(r'^.*$', views.IndexView.as_view(), name='index'),
)
