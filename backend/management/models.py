from django.db import models


class Setting(models.Model):
    key = models.CharField(verbose_name="Key", max_length=90)
    value = models.CharField(verbose_name="Value", max_length=90)
    desc = models.TextField(verbose_name="desc", blank=True)

    def __str__(self):
        return self.key + ":" + self.value

    class Meta:
        verbose_name = "Setting"
        indexes = [models.Index(fields=["key"])]
