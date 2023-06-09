# Generated by Django 4.2 on 2023-05-10 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stacker', models.PositiveSmallIntegerField(verbose_name='stacker')),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'IN/入库'), (1, 'OUT/出库'), (2, 'CHECK/盘库')], verbose_name='type')),
                ('targetn', models.PositiveSmallIntegerField(verbose_name='targetN')),
                ('targetx', models.PositiveSmallIntegerField(verbose_name='targetX')),
                ('targety', models.PositiveSmallIntegerField(verbose_name='targetY')),
                ('priority', models.BooleanField(default=False, verbose_name='priority')),
                ('executing', models.BooleanField(default=False, verbose_name='executing')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='time')),
            ],
            options={
                'verbose_name': 'Task',
            },
        ),
        migrations.AddIndex(
            model_name='task',
            index=models.Index(fields=['stacker'], name='task_task_stacker_f915a7_idx'),
        ),
    ]
