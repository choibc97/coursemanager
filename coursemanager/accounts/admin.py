from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'last_name', 'first_name',
                    'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal Information', {'fields': ('first_name', 'last_name')})
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'password1', 'password2',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal Information (Optional)', {
         'fields': ('first_name', 'last_name')})
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email', 'last_name', 'first_name')


admin.site.register(User, CustomUserAdmin)
