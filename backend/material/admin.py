from django.contrib import admin
from .models import Material


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "desc", "material", "unit")
