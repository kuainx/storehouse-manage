# Generated by Django 4.2 on 2023-05-10 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='time')),
                ('msg', models.TextField()),
                ('reporter', models.CharField(max_length=32, verbose_name='target')),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'log'), (1, 'info'), (2, 'warn'), (3, 'error')], default=0, max_length=4, verbose_name='type')),
            ],
            options={
                'verbose_name': 'Log',
            },
        ),
    ]
