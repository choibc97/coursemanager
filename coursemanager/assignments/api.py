from rest_framework import viewsets
from rest_framework.response import Response
from .models import AssignmentGroup, Assignment
from .serializers import AssignmentGroupSerializer, AssignmentSerializer
from .policies import AssignmentAccessPolicy


class AssignmentGroupViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentGroupSerializer
    permission_classes = [AssignmentAccessPolicy]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        assignments = instance.assignments

        return Response({
            'assignment_group': self.get_serializer(instance).data,
            'assignments': AssignmentSerializer(assignments, many=True).data
        })

    def get_queryset(self):
        queryset = AssignmentGroup.objects.all()

        course = self.request.query_params.get('course')
        if course:
            queryset = queryset.filter(course=course)

        return queryset


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    permission_classes = [AssignmentAccessPolicy]

    def get_queryset(self):
        queryset = Assignment.objects.all()

        course = self.request.query_params.get('course')
        if course:
            queryset = queryset.filter(course=course)

        group = self.request.query_params.get('group')
        if group:
            queryset = queryset.filter(group=group)

        return queryset
