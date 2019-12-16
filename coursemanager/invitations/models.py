from django.db import models
from django.conf import settings

import secrets
import datetime


User = settings.AUTH_USER_MODEL


def get_token():
    return secrets.token_urlsafe(32)


def get_expiration():
    return datetime.datetime.now() + datetime.timedelta(7)


class RegisterInvitation(models.Model):
    recipient = models.OneToOneField(User,
                                     on_delete=models.CASCADE,
                                     related_name='register_invitation',
                                     primary_key=True)
    token = models.CharField(
        max_length=50, default=get_token)
    expiration = models.DateTimeField(default=get_expiration)

    def __str__(self):
        return self.recipient
