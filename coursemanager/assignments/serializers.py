from rest_framework import serializers
from .models import AssignmentGroup, Assignment


class AssignmentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentGroup
        fields = '__all__'
