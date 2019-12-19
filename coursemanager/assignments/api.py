from rest_framework import viewsets, mixins
from rest_framework.response import Response
from .models import AssignmentGroup, Assignment, StudentAssignment
from .serializers import (AssignmentGroupSerializer,
                          AssignmentSerializer, StudentAssignmentSerializer)
from .policies import (AssignmentGroupAccessPolicy,
                       AssignmentAccessPolicy, StudentAssignmentAccessPolicy)


class AssignmentGroupViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentGroupSerializer
    permission_classes = [AssignmentGroupAccessPolicy]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        assignments = instance.assignments.all()

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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        student_assignments = instance.student_assignments.all()

        return Response({
            'assignment': self.get_serializer(instance).data,
            'student_assignments': StudentAssignmentSerializer(
                student_assignments, many=True).data
        })

    def get_queryset(self):
        queryset = Assignment.objects.all()

        course = self.request.query_params.get('course')
        if course:
            queryset = queryset.filter(course=course)

        group = self.request.query_params.get('group')
        if group:
            queryset = queryset.filter(group=group)

        return queryset


class StudentAssignmentViewSet(mixins.RetrieveModelMixin,
                               mixins.UpdateModelMixin,
                               viewsets.GenericViewSet):
    serializer_class = StudentAssignmentSerializer
    permission_classes = [StudentAssignmentAccessPolicy]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        assignment = instance.assignment

        return Response({
            'student_assignment': self.get_serializer(instance).data,
            'assignment': AssignmentSerializer(assignment).data
        })

    def get_object(self):
        student = self.request.query_params.get('student')
        assignment = self.request.query_params.get('assignment')

        return StudentAssignment.objects.get(
            student=student, assignment=assignment)
