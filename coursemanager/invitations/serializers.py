from rest_framework import serializers
from .models import InstructorInvitation


class InstructorInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorInvitation
        fields = '__all__'
