from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Chat Project  API",
        default_version="v1",
        description="API Documentation for Web application",
        terms_of_service="",
        contact=openapi.Contact(
            email="info@testing.com",
        ),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
schema = schema_view.with_ui("swagger", cache_timeout=0)


urlpatterns = [
    path("api/docs/", schema, name="schema-swagger-ui"),
    path("api/chats/", include("apps.chat.urls")),
    path("api/auth/", include("apps.authentication.routers")),
    path("api/", include("apps.authentication.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
