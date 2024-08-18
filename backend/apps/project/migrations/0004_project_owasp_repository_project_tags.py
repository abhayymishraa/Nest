# Generated by Django 5.1 on 2024-08-18 00:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("project", "0003_alter_project_options_alter_project_key_and_more"),
        ("repository", "0008_repository_has_downloads_repository_has_issues_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="owasp_repository",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="repository.repository",
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="tags",
            field=models.JSONField(default=list, verbose_name="Tags"),
        ),
    ]
