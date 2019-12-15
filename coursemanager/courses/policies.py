from rest_access_policy import AccessPolicy


class CourseAccessPolicy(AccessPolicy):
    statements = [
        {
            'action': ['destroy', 'update', 'partial_update', 'retrieve'],
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_instructor'
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
        course = view.get_object()
        return course.instructors.filter(email=request.user.email).exists()
