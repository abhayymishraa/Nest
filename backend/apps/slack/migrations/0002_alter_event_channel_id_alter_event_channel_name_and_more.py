# Generated by Django 5.1.6 on 2025-02-09 02:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("slack", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="channel_id",
            field=models.CharField(default="", max_length=15, verbose_name="Channel ID"),
        ),
        migrations.AlterField(
            model_name="event",
            name="channel_name",
            field=models.CharField(default="", max_length=100, verbose_name="Channel name"),
        ),
        migrations.AlterField(
            model_name="event",
            name="command",
            field=models.CharField(default="", max_length=15, verbose_name="Command"),
        ),
        migrations.AlterField(
            model_name="event",
            name="text",
            field=models.CharField(default="", max_length=1000, verbose_name="Text"),
        ),
        migrations.AlterField(
            model_name="event",
            name="trigger",
            field=models.CharField(default="", max_length=100, verbose_name="Trigger"),
        ),
        migrations.AlterField(
            model_name="event",
            name="user_id",
            field=models.CharField(max_length=15, verbose_name="User ID"),
        ),
        migrations.AlterField(
            model_name="event",
            name="user_name",
            field=models.CharField(default="", max_length=100, verbose_name="User name"),
        ),
    ]
