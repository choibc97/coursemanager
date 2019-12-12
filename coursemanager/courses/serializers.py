from rest_framework import serializers
from .models import Course
from accounts.serializers import UserSerializer, UserStudentSerializer


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

    def to_representation(self, instance):
        serializer = CourseReadSerializer(instance)
        return serializer.data

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related('instructors', 'tas', 'students')
        return queryset
