# Generated by Django 4.2 on 2023-05-08 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0002_alter_setting_options_alter_setting_key_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='desc',
            field=models.TextField(blank=True, verbose_name='desc'),
        ),
    ]
