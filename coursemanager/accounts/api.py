from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import (UserSerializer, LoginSerializer,
                          TokenRegisterSerializer)
from courses.serializers import CourseStudentSerializer, CourseSerializer
from invitations.models import RegisterInvitation
from invitations.serializers import RegisterInvitationSerializer


# login api
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)  # _ is instance

        return Response({
            'user': UserSerializer(
                user, context=self.get_serializer_context()).data,
            'token': token,
            'instructor_courses': CourseSerializer(
                user.instructor_courses.all(), many=True).data,
            'ta_courses': CourseSerializer(
                user.ta_courses.all(), many=True).data,
            'student_courses': CourseStudentSerializer(
                user.student_courses.all(), many=True).data
        })


# register with registration invitation
class RegisterAPI(generics.GenericAPIView):
    serializer_class = TokenRegisterSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, *args, **kwargs):
        invitation_token = request.data.get('token')
        invitation = RegisterInvitation.objects.get(token=invitation_token)

        user = invitation.recipient
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        invitation.delete()

        _, token = AuthToken.objects.create(user)  # _ is instance
        return Response({
            'user': UserSerializer(
                user, context=self.get_serializer_context()).data,
            'token': token,
            'instructor_courses': CourseSerializer(
                user.instructor_courses.all(), many=True).data,
            'ta_courses': CourseSerializer(
                user.ta_courses.all(), many=True).data,
            'student_courses': CourseStudentSerializer(
                user.student_courses.all(), many=True).data
        })


# get user api
class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        return Response({
            'user': UserSerializer(
                user, context=self.get_serializer_context()).data,
            'instructor_courses': CourseSerializer(
                user.instructor_courses.all(), many=True).data,
            'ta_courses': CourseSerializer(
                user.ta_courses.all(), many=True).data,
            'student_courses': CourseStudentSerializer(
                user.student_courses.all(), many=True).data
        })
