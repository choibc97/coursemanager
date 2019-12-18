from rest_framework import serializers
from .models import Course
from accounts.serializers import UserSerializer, UserStudentSerializer
from assignments.models import StudentAssignment
from assignments.serializers import StudentAssignmentSerializer


class CourseStudentSerializer(serializers.ModelSerializer):
    instructors = UserStudentSerializer(many=True)
    tas = UserStudentSerializer(many=True)

    class Meta:
        model = Course
        exclude = ['students']

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related('instructors', 'tas')
        return queryset


class CourseReadSerializer(serializers.ModelSerializer):
    instructors = UserSerializer(many=True)
    tas = UserSerializer(many=True)
    students = UserSerializer(many=True)

    class Meta:
        model = Course
        fields = '__all__'

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related('instructors', 'tas', 'students')
        return queryset


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        course = super().create(validated_data)
        self.create_student_assignments(course)
        return course

    def update(self, instance, validated_data):
        course = super().update(instance, validated_data)
        self.create_student_assignments(course)
        return course

    def create_student_assignments(self, instance):
        students = instance.students.all()
        for student in students:
            assignments = instance.assignments.all()
            for assignment in assignments:
                if not StudentAssignment.objects\
                        .filter(student=student.email,
                                assignment=assignment.id).exists():
                    serializer = StudentAssignmentSerializer(data={
                        'assignment': assignment.id,
                        'student': student.email,
                        'qr_code': f'{student.email}_{assignment.id}'
                    })
                    serializer.is_valid(raise_exception=True)
                    serializer.save()

    def to_representation(self, instance):
        serializer = CourseReadSerializer(instance)
        return serializer.data

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related('instructors', 'tas', 'students')
        return queryset
