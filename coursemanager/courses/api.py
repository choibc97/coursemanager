from .models import Course
from .serializers import CourseSerializer
from rest_framework import viewsets, permissions
from rest_access_policy import AccessPolicy


class CourseAccessPolicy(AccessPolicy):
    statements = [
        {
            'action': ['destroy', 'update', 'partial_update', 'retrieve'],
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_instructor'
        },
        {
            'action': '*',
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_staff'
        }
    ]

    def is_staff(self, request, view, action):
        return request.user.is_staff

    def is_instructor(self, request, view, action):
        course = view.get_object()
        return course.instructors.filter(email=request.user.email).exists()


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [CourseAccessPolicy]

    def get_queryset(self):
        queryset = Course.objects.all().order_by('course_id')
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
