from rest_framework import viewsets
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer
from .policies import CourseAccessPolicy
from accounts.models import User
from accounts.serializers import RegisterSerializer


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [CourseAccessPolicy]

    def create(self, request, *args, **kwargs):
        self.add_or_create_users(request)

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.add_or_create_users(request)

        return super().update(request, *args, **kwargs)

    def add_or_create_users(self, request):
        instructors = request.data.get('instructors')
        if instructors:
            for email in instructors:
                if not User.objects.filter(email=email).exists():
                    register_serializer = RegisterSerializer(
                        data={'email': email})
                    register_serializer.is_valid(raise_exception=True)
                    register_serializer.save()

        tas = request.data.get('tas')
        if tas:
            for email in tas:
                if not User.objects.filter(email=email).exists():
                    register_serializer = RegisterSerializer(
                        data={'email': email})
                    register_serializer.is_valid(raise_exception=True)
                    register_serializer.save()

        students = request.data.get('students')
        if students:
            for email in students:
                if not User.objects.filter(email=email).exists():
                    register_serializer = RegisterSerializer(
                        data={'email': email})
                    register_serializer.is_valid(raise_exception=True)
                    register_serializer.save()

    def get_queryset(self):
        queryset = Course.objects.all().order_by('course_id')
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
