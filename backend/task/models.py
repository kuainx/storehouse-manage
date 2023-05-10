from django.db import models


class TaskType(models.IntegerChoices):
    IN = 0, "IN/入库"
    OUT = 1, "OUT/出库"
    CHECK = 2, "CHECK/盘库"


class Task(models.Model):
    stacker = models.PositiveSmallIntegerField(verbose_name='stacker')
    type = models.PositiveSmallIntegerField(
        verbose_name='type',
        choices=TaskType.choices,
    )
    targetn = models.PositiveSmallIntegerField(verbose_name='targetN')
    targetx = models.PositiveSmallIntegerField(verbose_name='targetX')
    targety = models.PositiveSmallIntegerField(verbose_name='targetY')
    priority = models.BooleanField(verbose_name='priority', default=False)
    executing = models.BooleanField(verbose_name='executing', default=False)
    time = models.DateTimeField(verbose_name='time', auto_now_add=True)

    # def __str__(self):
    #     return self.key+':'+self.value

    class Meta:
        verbose_name = "Task"
        indexes = [models.Index(fields=["stacker"])]
