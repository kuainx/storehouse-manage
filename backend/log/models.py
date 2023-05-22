from django.db import models


class LogType(models.IntegerChoices):
    LOG = 0, "log"
    INFO = 1, "info"
    WARN = 2, "warn"
    ERROR = 3, "error"


class Log(models.Model):
    time = models.DateTimeField(verbose_name="time", auto_now_add=True)
    msg = models.TextField()
    reporter = models.CharField(verbose_name="reporter", max_length=32)
    type = models.PositiveSmallIntegerField(
        verbose_name="type",
        choices=LogType.choices,
        default=LogType.LOG,
    )

    class Meta:
        verbose_name = "Log"
