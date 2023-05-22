from import_export import resources
from .models import Setting


class SettingResource(resources.ModelResource):
    class Meta:
        model = Setting
        import_id_fields = ("key",)
