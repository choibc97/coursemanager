from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'instructor'),
        (2, 'ta'),
        (3, 'student')
    )

    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)
