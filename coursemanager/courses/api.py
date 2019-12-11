from .models import Course
from .serializers import CourseSerializer
from rest_framework import viewsets, permissions
from rest_access_policy import AccessPolicy


class CourseAccessPolicy(AccessPolicy):
    statements = [
        {
            'action': ['retrieve', 'destroy', 'update'],
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': ['is_staff', 'is_instructor']
        },
        {
            'action': ['list', 'create'],
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_staff'
        }
    ]

    def is_staff(self, request, view, action):
        return request.user.is_staff

    def is_instructor(self, request, view, action):
        course = view.get_object()
        return course.instructors.filter(username=request.username).exists()


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [CourseAccessPolicy]
