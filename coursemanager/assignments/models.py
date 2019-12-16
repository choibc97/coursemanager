from django.db import models
from courses.models import Course


class AssignmentGroup(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='assignment_groups')
    title = models.CharField(max_length=100, unique=True)
    points = models.PositiveSmallIntegerField()
    due_date = models.DateTimeField()

    def __str__(self):
        return f'{self.course.course_id}: {self.title}'


class Assignment(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='assignments')
    group = models.ForeignKey(
        AssignmentGroup, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=100, unique=True)
    points = models.PositiveSmallIntegerField()
    due_date = models.DateTimeField()

    def __str__(self):
        return f'{self.course.course_id} {self.group.title} {self.title}'


# class StudentAssignment(models.Model):
#     assignment = models.ForeignKey(Assignment,
#                                    on_delete=models.CASCADE,
#                                    related_name='student_assignments')
#     student = models.ForeignKey(User, on_delete=models.CASCADE,
#                                 related_name='student_assignments')
#     qr_code = models.ImageField()
#     completed = models.BooleanField(default=False)
#     points_earned = models.PositiveSmallIntegerField()
#     timestamp = models.DateTimeField(auto_now=True)
#     grader = models.ForeignKey(User, on_delete=models.CASCADE,
#                                related_name='graded_assignments', blank=True)
#     comment = models.TextField(blank=True)
