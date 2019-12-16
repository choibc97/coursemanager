from rest_framework import serializers
from .models import RegisterInvitation


class RegisterInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterInvitation
        fields = '__all__'
