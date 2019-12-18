from rest_framework import serializers
from .models import AssignmentGroup, Assignment


class AssignmentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentGroup
        fields = '__all__'


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'
