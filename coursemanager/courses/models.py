from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


class Course(models.Model):
    course_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100, unique=True)
    instructors = models.ManyToManyField(
        User, related_name='instructor_courses')
    tas = models.ManyToManyField(User, related_name='ta_courses', blank=True)
    students = models.ManyToManyField(
        User, related_name='student_courses', blank=True)

    class Meta:
        ordering = ['course_id']

    def __str__(self):
        return f'{self.course_id}: {self.title}'
