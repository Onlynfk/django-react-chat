from rest_framework.routers import DefaultRouter

from .viewsets import (
    RegistrationViewSet,
    LoginViewSet,
)

routes = DefaultRouter()

# AUTHENTICATION
routes.register(r"register", RegistrationViewSet, basename="auth-register")
routes.register(r"login", LoginViewSet, basename="auth-login")
urlpatterns = [
    *routes.urls,
]
