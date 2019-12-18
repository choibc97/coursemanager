from django.db import models
from courses.models import Course
from django.conf import settings


User = settings.AUTH_USER_MODEL


class AssignmentGroup(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='assignment_groups')
    title = models.CharField(max_length=100)
    points = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ['points', 'title']
        unique_together = [['course', 'title']]

    def __str__(self):
        return f'{self.course.course_id}: {self.title}'


class Assignment(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='assignments')
    group = models.ForeignKey(
        AssignmentGroup, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=100)
    points = models.PositiveSmallIntegerField()
    due_date = models.DateTimeField()

    class Meta:
        ordering = ['due_date', 'points', 'title']
        unique_together = [['group', 'title']]

    def __str__(self):
        return f'{self.course.course_id} {self.group.title}: {self.title}'


class StudentAssignment(models.Model):
    assignment = models.ForeignKey(Assignment,
                                   on_delete=models.CASCADE,
                                   related_name='student_assignments')
    student = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name='student_assignments')
    qr_code = models.CharField(max_length=100, unique=True)
    completed = models.BooleanField(default=False)
    points_earned = models.FloatField(default=0)
    timestamp = models.DateTimeField(auto_now=True)
    grader = models.ForeignKey(User, on_delete=models.CASCADE,
                               related_name='graded_assignments', blank=True,
                               null=True)
    comment = models.TextField(blank=True)

    class Meta:
        ordering = ['assignment__due_date',
                    'assignment__points', 'assignment__title']
        unique_together = [['assignment', 'student']]

    def __str__(self):
        return f'{self.assignment.title}: {self.student.email}'
