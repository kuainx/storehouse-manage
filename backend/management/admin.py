from django.contrib import admin
from .models import Setting
# Register your models here.


class SettingAdmin(admin.ModelAdmin):
    list_display = ('id','key', 'value')

    '''filter options'''
    list_filter = ('key', )

    '''10 items per page'''
    list_per_page = 10


admin.site.register(Setting, SettingAdmin)
