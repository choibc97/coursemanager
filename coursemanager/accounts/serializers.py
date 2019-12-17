from django.contrib.auth import authenticate, password_validation
from django.core import exceptions
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


# register with dummy password serializer
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


# register through registration invitation token
class TokenRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        user = User(**data)
        password = data.get('password')

        errors = dict()
        try:
            password_validation.validate_password(password=password, user=User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super().validate(data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.is_active = True
        instance.set_password(validated_data['password'])
        instance.save()

        return instance


# login serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")
