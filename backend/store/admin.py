from django.contrib import admin
from .models import Store
# Register your models here.


class StoreAdmin(admin.ModelAdmin):
    list_display = ('id','storen', 'storey','storex','status','good')


admin.site.register(Store,StoreAdmin)