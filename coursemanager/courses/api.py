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
        self.parse_users(request)

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.parse_users(request)

        return super().update(request, *args, **kwargs)

    def parse_users(self, request):
        instructors = request.data.get('instructors')
        if instructors:
            self.get_or_add_users(instructors)

        tas = request.data.get('tas')
        if tas:
            self.get_or_add_users(tas)

        students = request.data.get('students')
        if students:
            self.get_or_add_users(students)

    def get_or_add_users(self, users):
        for email in users:
            if not User.objects.filter(email=email).exists():
                register_serializer = RegisterSerializer(
                    data={'email': email})
                register_serializer.is_valid(raise_exception=True)
                register_serializer.save()

    def get_queryset(self):
        queryset = Course.objects.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
