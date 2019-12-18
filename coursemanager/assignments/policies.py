from rest_access_policy import AccessPolicy
from courses.models import Course


class AssignmentAccessPolicy(AccessPolicy):
    statements = [
        {
            'action': '*',
            'principal': 'authenticated',
            'effect': 'allow',
            'conditon': 'is_instructor'
        },
        {
            'action': '*',
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_staff'
        },
        {
            'action': ['list', 'retrieve'],
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_ta'
        },
        {
            'action': ['list', 'retrieve'],
            'principal': 'authenticated',
            'effect': 'allow',
            'condition': 'is_student'
        }
    ]

    def is_staff(self, request, view, action):
        return request.user.is_staff

    def is_instructor(self, request, view, action):
        if action == 'create':
            course = Course.objects.get(request.data['course'])
            return course.instructors.filter(email=request.user.email).exists()
        elif action == 'list':
            id = request.query_params.get('course')
            if id:
                course = Course.objects.get(id=id)
                return course.instructors.filter(email=request.user.email).exists()
            return False
        else:
            instance = view.get_object()
            return instance.course.instructors.filter(
                email=request.user.email).exists()

    def is_ta(self, request, view, action):
        if action == 'retrieve':
            instance = view.get_object()
            return instance.course.tas.filter(email=request.user.email).exists()
        else:
            id = request.query_params.get('course')
            if id:
                course = Course.objects.get(id=id)
                return course.tas.filter(email=request.user.email).exists()
            return False

    def is_student(self, request, view, action):
        if action == 'retrieve':
            instance = view.get_object()
            return instance.course.students.filter(email=request.user.email).exists()
        else:
            id = request.query_params.get('course')
            if id:
                course = Course.objects.get(id=id)
                return course.students.filter(email=request.user.email).exists()
            return False
