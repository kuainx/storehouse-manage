from django.db import models


class Material(models.Model):
    name = models.CharField(verbose_name='name', max_length=64)
    desc = models.TextField(verbose_name='desc', blank=True)
    material = models.CharField(verbose_name='material', max_length=64)
    unit = models.CharField(verbose_name='unit', max_length=64)
    info = models.JSONField(verbose_name='info', default=dict, blank=True)

    def __str__(self):
        return self.name+'('+self.unit+')'

    class Meta:
        verbose_name = "Material"
        indexes = [models.Index(fields=["name"])]
