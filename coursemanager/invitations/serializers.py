from rest_framework import serializers
from .models import RegisterInvitation

from django.core.mail import send_mail
from django.conf import settings

import datetime


class RegisterInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterInvitation
        fields = '__all__'

    def create(self, validated_data):
        invitation = super().create(validated_data)

        subject = 'Register for WUSTL Course Manager'
        message = ('An instructor has invited you to register for '
                   'WUSTL Course Manager.'
                   '\n\n'
                   'Click on the following link to register: '
                   'masters.benjaminchoi.com/#/register/'
                   f'{invitation.token}')
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [invitation.recipient.email]
        send_mail(subject, message, from_email, recipient_list)

        return invitation
