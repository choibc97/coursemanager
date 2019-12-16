from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User
from invitations.serializers import RegisterInvitationSerializer


# user serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'is_staff')


class UserStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


# register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email',)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], is_active=False)

        invitation_serializer = RegisterInvitationSerializer(data={
            'recipient': user.email,
        })
        invitation_serializer.is_valid(raise_exception=True)
        invitation_serializer.save()

        return user


# login serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")
