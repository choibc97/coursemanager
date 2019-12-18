from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .models import RegisterInvitation
from .serializers import RegisterInvitationSerializer


class RegisterInvitationAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RegisterInvitationSerializer

    def get_object(self):
        token = self.request.query_params['token']
        return RegisterInvitation.objects.get(token=token)
