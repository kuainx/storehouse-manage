from django.db import models

class Task(models.Model):
    stacker = models.PositiveSmallIntegerField(verbose_name='stacker')
    origin = models.CharField(verbose_name='origin', max_length=32)
    target = models.CharField(verbose_name='target', max_length=32)
    priority = models.BooleanField(verbose_name='priority',default=False)
    executing = models.BooleanField(verbose_name='executing',default=False)
    time = models.DateTimeField(verbose_name='time',auto_now_add=True)

    # def __str__(self):
    #     return self.key+':'+self.value

    class Meta:
        verbose_name = "Task"
        indexes = [models.Index(fields=["stacker"])]
