from django.contrib import admin
from .models import Material
# Register your models here.


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'desc','material','unit')
    # list_editable=['name', 'desc','material','unit']


# admin.site.register(Material,MaterialAdmin)