# Generated by Django 4.2 on 2023-05-02 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Setting",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "key",
                    models.CharField(
                        db_index=True, max_length=90, verbose_name="Key (*)"
                    ),
                ),
                ("value", models.CharField(max_length=90, verbose_name="Value (*)")),
            ],
            options={"verbose_name": "Setting", "verbose_name_plural": "Settings",},
        ),
    ]
