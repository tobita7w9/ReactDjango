# Generated by Django 4.1 on 2022-10-01 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_server", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="samplemodel",
            name="completed",
            field=models.BooleanField(default=False),
        ),
    ]
