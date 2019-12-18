from rest_framework import serializers
from .models import AssignmentGroup, Assignment, StudentAssignment


class AssignmentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentGroup
        fields = '__all__'


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

    def create(self, validated_data):
        assignment = super().create(validated_data)

        course = validated_data['course']
        students = course.students.all()
        for student in students:
            serializer = StudentAssignmentSerializer(data={
                'assignment': assignment.id,
                'student': student.email,
                'qr_code': f'{student.email}_{assignment.id}'
            })
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return assignment

    def update(self, instance, validated_data):
        old_points = instance.points
        assignment = super().update(instance, validated_data)
        new_points = assignment.points

        if old_points != new_points:
            student_assignments = assignment.student_assignments.all()
            for student_assignment in student_assignments:
                percentage = student_assignment.points_earned / old_points
                serializer = StudentAssignmentSerializer(student_assignment, data={
                    'points_earned': percentage * new_points
                }, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()

        return assignment


class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAssignment
        fields = '__all__'
