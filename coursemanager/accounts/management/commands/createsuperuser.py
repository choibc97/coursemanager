from django.core.management.base import BaseCommand, CommandError
from accounts.models import User


class Command(BaseCommand):
    help = "Creates a non-admin user"

    def add_arguments(self, parser):
        parser.add_argument('--id', help='WUSTL ID #', type=int)
        parser.add_argument('--username', help='WUSTL Key')
        parser.add_argument('--email', help='WUSTL Email')
        parser.add_argument('--first_name', help='First Name')
        parser.add_argument('--last_name', help='Last Name')
        parser.add_argument('--password', help='Password')

    def handle(self, *args, **options):
        if options['id']:
            id = options['id']
        else:
            id = int(input('WUSTL ID #: '))

        if options['username']:
            username = options['username']
        else:
            username = input('WUSTL Key: ')

        if options['email']:
            email = options['email']
        else:
            email = input('WUSTL Email: ')

        if options['first_name']:
            first_name = options['first_name']
        else:
            first_name = input('First Name: ')

        if options['last_name']:
            last_name = options['last_name']
        else:
            last_name = input('Last Name: ')

        if options['password']:
            password = options['password']
        else:
            password = input('Password: ')

        User.objects.create_superuser(
            id, username, email, first_name, last_name, password)
        self.stdout.write(self.style.SUCCESS(
            f'Successfully created user {username}'))
