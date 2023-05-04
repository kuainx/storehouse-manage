from django.db import models

class StoreStatus(models.TextChoices):
    EMPTY = "EMTY", "Empty/空"
    RESERVED = "RSVD", "Reserved/已预订"
    OCCUPIED = "OCUP", "Occupied/已占用"
    LOCKED = "LOCK", "Locked/已锁定"

class Store(models.Model):
    storen = models.PositiveSmallIntegerField(verbose_name='N')
    storex = models.PositiveSmallIntegerField(verbose_name='X')
    storey = models.PositiveSmallIntegerField(verbose_name='Y')
    status = models.CharField(
        verbose_name='Status',
        max_length=4,
        choices=StoreStatus.choices,
        default=StoreStatus.EMPTY,
    )
    good = models.CharField(verbose_name='GoodName', max_length=90,default='NULL')
    details = models.JSONField(verbose_name='GoodDetail',default=dict)

    # def __str__(self):
    #     return self.key+':'+self.value

    class Meta:
        verbose_name = "Store"
        verbose_name_plural = "Stores"
        indexes = [models.Index(fields=["storen", "storey", "storex"])]
