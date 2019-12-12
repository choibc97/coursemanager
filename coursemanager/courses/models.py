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

    def __str__(self):
        return f'{self.id}: {self.title}'


class AssignmentGroup(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='assignment_groups')
    title = models.CharField(max_length=100, unique=True)
    points = models.PositiveSmallIntegerField()
    due_date = models.DateTimeField()


class Assignment(models.Model):
    group = models.ForeignKey(
        AssignmentGroup, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=100, unique=True)
    points = models.PositiveSmallIntegerField()
    due_date = models.DateTimeField()


class StudentAssignment(models.Model):
    assignment = models.ForeignKey(Assignment,
                                   on_delete=models.CASCADE,
                                   related_name='student_assignments')
    student = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name='student_assignments')
    qr_code = models.ImageField()
    completed = models.BooleanField(default=False)
    points_earned = models.PositiveSmallIntegerField()
    timestamp = models.DateTimeField(auto_now=True)
    grader = models.ForeignKey(User, on_delete=models.CASCADE,
                               related_name='graded_assignments', blank=True)
    comment = models.TextField(blank=True)
