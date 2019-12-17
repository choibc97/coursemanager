from django.urls import path, include
from .api import RegisterInvitationAPI

urlpatterns = [
    path('api/register_invitation', RegisterInvitationAPI.as_view())
]
