from rest_framework import routers
from .api import AssignmentGroupViewSet

router = routers.DefaultRouter()
router.register('api/assignment_groups',
                AssignmentGroupViewSet, 'assignment_groups')

urlpatterns = router.urls
