from rest_framework import serializers
from .models import InstructorInvitation

import secrets
import datetime


class InstructorInvitationSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    expiration = serializers.SerializerMethodField()

    class Meta:
        model = InstructorInvitation
        fields = '__all__'

    def get_token(self):
        token = secrets.token_urlsafe(32)
        while InstructorInvitation.objects.filter(token=token).exists():
            token = secrets.token_urlsafe(32)
        return token

    def get_expiration(self):
        return datetime.datetime.now() + datetime.timedelta(7)
