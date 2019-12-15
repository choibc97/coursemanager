from django.db import models
from django.conf import settings
from courses.models import Course


User = settings.AUTH_USER_MODEL


class InstructorInvitation(models.Model):
    token = models.CharField(max_length=50, primary_key=True)
    sender = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name='instructor_invitations')
    recipient = models.EmailField()
    course = models.ForeignKey(Course,
                               on_delete=models.CASCADE,
                               related_name='instructor_invitations')
    expiration = models.DateTimeField()

    def __str__(self):
        return f'{self.course.course_id}: Instructor {self.recipient}'
