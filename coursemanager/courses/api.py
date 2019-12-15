from rest_framework import viewsets
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer
from .policies import CourseAccessPolicy


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [CourseAccessPolicy]

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def get_queryset(self):
        queryset = Course.objects.all().order_by('course_id')
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
