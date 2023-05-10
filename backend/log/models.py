from django.db import models


class LogStatus(models.IntegerChoices):
    LOG = 0, "log"
    INFO = 1, "info"
    WARN = 2, "warn"
    ERROR = 3, "error"


class Log(models.Model):
    time = models.DateTimeField(verbose_name='time', auto_now_add=True)
    msg = models.TextField()
    reporter = models.CharField(verbose_name='target', max_length=32)
    type = models.PositiveSmallIntegerField(
        verbose_name='type',
        max_length=4,
        choices=LogStatus.choices,
        default=LogStatus.LOG,
    )
    # def __str__(self):
    #     return self.key+':'+self.value

    class Meta:
        verbose_name = "Log"