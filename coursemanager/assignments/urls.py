from rest_framework import routers
from .api import AssignmentGroupViewSet, AssignmentViewSet

router = routers.DefaultRouter()
router.register('api/assignment_groups',
                AssignmentGroupViewSet, 'assignment_groups')
router.register('api/assignments', AssignmentViewSet, 'assignments')

urlpatterns = router.urls
