from rest_framework import serializers
from .models import AssignmentGroup, Assignment, StudentAssignment
from django.utils import timezone


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

        students = assignment.course.students.all()
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
        old_due_date = instance.due_date

        assignment = super().update(instance, validated_data)

        new_points = assignment.points
        new_due_date = assignment.due_date

        if old_points != new_points or old_due_date != new_due_date:
            student_assignments = assignment.student_assignments.all()
            for student_assignment in student_assignments:
                percentage = student_assignment.points_earned / old_points
                is_late = new_due_date < student_assignment.timestamp
                serializer = StudentAssignmentSerializer(student_assignment, data={
                    'points_earned': percentage * new_points,
                    'is_late': is_late
                }, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()

        return assignment


class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAssignment
        fields = '__all__'

    def update(self, instance, validated_data):
        assignment = instance.assignment
        instance.is_late = assignment.due_date < timezone.now()
        points_earned = validated_data.get(
            'points_earned', instance.points_earned)
        instance.points_earned = points_earned if points_earned \
            <= assignment.points else assignment.points
        instance.completed = validated_data.get(
            'completed', instance.completed)
        instance.grader = validated_data.get('grader', instance.grader)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()

        return instance
