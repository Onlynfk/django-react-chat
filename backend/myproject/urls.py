from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from . import api
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path("admin/", admin.site.urls),
] + api.urlpatterns


urlpatterns += staticfiles_urlpatterns()
