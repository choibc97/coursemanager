from rest_framework import viewsets
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer
from .policies import CourseAccessPolicy
from accounts.models import User
from invitations.serializers import InstructorInvitationSerializer


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [CourseAccessPolicy]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        instructors = []
        if 'instructors' in serializer.initial_data:
            for pk in serializer.initial_data['instructors']:
                if User.objects.filter(pk=pk).exists():
                    instructors.append(pk)
                else:
                    data = {
                        'sender': request.user.id,
                        'recipient': pk,
                        'course': instance.id
                    }
                    invitation_serializer = \
                        InstructorInvitationSerializer(data=data)
                    invitation_serializer.is_valid(raise_exception=True)
                    invitation_serializer.save()

        if 'tas' in serializer.initial_data:
            for ta in serializer.initial_data['tas']:
                pass

        if 'students' in serializer.initial_data:
            for student in serializer.initial_data['students']:
                pass

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Course.objects.all().order_by('course_id')
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
