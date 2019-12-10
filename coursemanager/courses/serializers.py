from rest_framework import serializers
from .models import Course
from accounts.serializers import UserSerializer


class CourseReadSerializer(serializers.ModelSerializer):
    instructors = UserSerializer()
    tas = UserSerializer()
    students = UserSerializer()

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
        field = '__all__'

    def to_representation(self, instance):
        serializer = CourseReadSerializer(instance)
        return serializer.data

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related('instructors', 'tas', 'students')
        return queryset
