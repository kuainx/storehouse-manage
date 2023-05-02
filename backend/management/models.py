from django.db import models

# Create your models here.


class Setting(models.Model):
    key = models.CharField(verbose_name='Key (*)',
                           max_length=90, db_index=True)
    value = models.CharField(verbose_name='Value (*)', max_length=90)

    def __str__(self):
        return self.key+':'+self.value

    class Meta:
        verbose_name = "Setting"
        verbose_name_plural = "Settings"
