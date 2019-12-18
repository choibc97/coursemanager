from django.contrib import admin
from .models import AssignmentGroup, Assignment, StudentAssignment

admin.site.register(AssignmentGroup)
admin.site.register(Assignment)
admin.site.register(StudentAssignment)
