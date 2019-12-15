from rest_access_policy import AccessPolicy
from courses.models import Course


class AssignmentGroupAccessPolicy(AccessPolicy):
    statements = [
        {
            'action': ['create', 'destroy', 'update', 'partial_update',
                       'retrieve'],
            'principal': 'authenticated',
            'effect': 'allow',
            'conditon': 'is_instructor'
        },
        {
            'action': '*',
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_staff'
        }
    ]

    def is_staff(self, request, view, action):
        return request.user.is_staff

    def is_instructor(self, request, view, action):
        if action == 'create':
            course = Course.objects.get(request.data['course'])
            return course.instructors.filter(email=request.user.email).exists()
        else:
            assignment_group = view.get_object()
            return assignment_group.course.instructors.filter(
                email=request.user.email).exists()
