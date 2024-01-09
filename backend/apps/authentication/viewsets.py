from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status

from .serializers import RegisterSerializer, LoginSerializer
from .models import User


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    http_method_names = ["post", "patch"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_serializer = self.serializer_class(user, many=False)

        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": user_serializer.data,
        }

        return Response(res, status=status.HTTP_201_CREATED)


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        req_data = request.data
        email = req_data.get("email")
        password = req_data.get("password")

        if not email or not password:
            return Response({"detail": "Must include email and password."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            return Response({"detail": e.detail["non_field_errors"][0]}, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        return Response(
            {"user": data.get("user"), "refresh": data.get("refresh"), "access": data.get("access")},
            status=status.HTTP_200_OK,
        )
