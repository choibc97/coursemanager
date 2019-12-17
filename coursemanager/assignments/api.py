from rest_framework import viewsets
from .models import AssignmentGroup
from .serializers import AssignmentGroupSerializer
from .policies import AssignmentGroupAccessPolicy


class AssignmentGroupViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentGroupSerializer
    permission_classes = [AssignmentGroupAccessPolicy]

    def get_queryset(self):
        queryset = AssignmentGroup.objects.all().order_by('points')

        course = self.request.query_params.get('course')
        if course:
            queryset = queryset.filter(course=course)

        return queryset
