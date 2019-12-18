from django.urls import path, include
from rest_framework import routers
from .api import (AssignmentGroupViewSet,
                  AssignmentViewSet, StudentAssignmentViewSet)

router = routers.DefaultRouter()
router.register('api/assignment_groups',
                AssignmentGroupViewSet, 'assignment_groups')
router.register('api/assignments', AssignmentViewSet, 'assignments')

urlpatterns = [
    path('api/student_assignments',
         StudentAssignmentViewSet.as_view({
             'get': 'retrieve',
             'put': 'update',
             'patch': 'partial_update'
         }))
] + router.urls
