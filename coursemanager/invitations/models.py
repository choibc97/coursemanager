from django.db import models
from django.conf import settings

import secrets


User = settings.AUTH_USER_MODEL


def get_token():
    return secrets.token_urlsafe(32)


class RegisterInvitation(models.Model):
    recipient = models.OneToOneField(User,
                                     on_delete=models.CASCADE,
                                     related_name='register_invitation',
                                     primary_key=True)
    token = models.CharField(
        max_length=50, default=get_token)

    def __str__(self):
        return self.recipient.email
