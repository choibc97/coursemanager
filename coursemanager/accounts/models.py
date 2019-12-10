from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import FieldError


class UserManager(BaseUserManager):
    def create_user(self, id, username, email, first_name, last_name,
                    password, **extra_fields):
        if len(str(id)) != 6:
            raise FieldError('A WUSTL id number must be 6 digits')
        id = int(id)

        email = self.normalize_email(email)
        if not email.endswith('wustl.edu'):
            raise FieldError('Email must be a wustl.edu address')

        username = User.normalize_username(username).lower()
        first_name = first_name.capitalize()
        last_name = last_name.capitalize()

        user = self.model(id=id, username=username, email=email,
                          first_name=first_name, last_name=last_name,
                          **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_password(self.make_random_password())

        user.save()

        return user

    def create_superuser(self, id, username, email, first_name, last_name,
                         password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if not extra_fields.get('is_staff'):
            raise FieldError('Superuser must also be staff')
        if not extra_fields.get('is_superuser'):
            raise FieldError('Superuser must be superuser')

        return self.create_user(id, username, email, first_name, last_name,
                                password, **extra_fields)


class User(AbstractUser):
    # wustl id #: eg 123456
    id = models.PositiveIntegerField(unique=True, primary_key=True)
    # wustl email address: eg johndoe@wustl.edu
    email = models.EmailField(unique=True)
    # username is wustl key: eg johndoe

    # make name required
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)

    objects = UserManager()
