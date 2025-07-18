"""GitHub app admin."""

from django.contrib import admin
from django.utils.safestring import mark_safe

from apps.github.models.issue import Issue
from apps.github.models.label import Label
from apps.github.models.milestone import Milestone
from apps.github.models.organization import Organization
from apps.github.models.pull_request import PullRequest
from apps.github.models.release import Release
from apps.github.models.repository import Repository
from apps.github.models.repository_contributor import RepositoryContributor
from apps.github.models.user import User


class IssueAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "repository",
        "author",
        "assignees",
        "labels",
    )
    list_display = (
        "repository",
        "title",
        "custom_field_github_url",
    )
    list_filter = (
        "state",
        "is_locked",
    )
    search_fields = ("title",)

    def custom_field_github_url(self, obj) -> str:
        """Issue GitHub URL.

        Args:
            obj (Issue): The issue instance.

        Returns:
            str: A safe HTML link to the issue on GitHub.

        """
        return mark_safe(f"<a href='{obj.url}' target='_blank'>↗️</a>")  # noqa: S308

    custom_field_github_url.short_description = "GitHub 🔗"


class LabelAdmin(admin.ModelAdmin):
    search_fields = ("name", "description")


class MilestoneAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "author",
        "labels",
        "repository",
    )
    search_fields = (
        "body",
        "title",
    )


class OrganizationAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "created_at",
        "updated_at",
        "followers_count",
    )
    list_filter = ("is_owasp_related_organization",)
    search_fields = (
        "login",
        "name",
    )


class PullRequestAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "assignees",
        "author",
        "labels",
        "repository",
    )
    list_display = (
        "repository",
        "title",
        "state",
        "custom_field_github_url",
        "created_at",
        "updated_at",
    )
    list_filter = (
        "state",
        "merged_at",
    )
    search_fields = (
        "author__login",
        "repository__name",
        "title",
    )

    def custom_field_github_url(self, obj: PullRequest) -> str:
        """Pull Request GitHub URL.

        Args:
            obj (PullRequest): The pull request instance.

        Returns:
            str: A safe HTML link to the pull request on GitHub.

        """
        return mark_safe(f"<a href='{obj.url}' target='_blank'>↗️</a>")  # noqa: S308

    custom_field_github_url.short_description = "GitHub 🔗"


class ReleaseAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "author",
        "repository",
    )
    search_fields = (
        "node_id",
        "repository__name",
    )


class RepositoryAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "organization",
        "owner",
    )
    list_display = (
        "custom_field_title",
        "created_at",
        "updated_at",
        "stars_count",
        "forks_count",
        "commits_count",
        "custom_field_github_url",
    )
    list_filter = (
        "is_archived",
        "is_empty",
        "is_owasp_repository",
        "is_owasp_site_repository",
        "has_funding_yml",
        "is_funding_policy_compliant",
        "is_template",
        "is_fork",
        "organization",
    )
    ordering = ("-created_at",)
    search_fields = ("name", "node_id")

    def custom_field_github_url(self, obj) -> str:
        """Repository GitHub URL.

        Args:
            obj (Repository): The repository instance.

        Returns:
            str: A safe HTML link to the repository on GitHub.

        """
        return mark_safe(  # noqa: S308
            f"<a href='https://github.com/{obj.owner.login}/{obj.name}' target='_blank'>↗️</a>"
        )

    def custom_field_title(self, obj: Repository) -> str:
        """Repository title.

        Args:
            obj (Repository): The repository instance.

        Returns:
            str: The formatted repository title as 'owner/repository_name'.

        """
        return f"{obj.owner.login}/{obj.name}"

    custom_field_title.short_description = "Name"
    custom_field_github_url.short_description = "GitHub 🔗"


class RepositoryContributorAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "repository",
        "user",
    )
    search_fields = ("user__login", "user__name")


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "created_at",
        "updated_at",
    )
    search_fields = (
        "login",
        "name",
    )


admin.site.register(Issue, IssueAdmin)
admin.site.register(Label, LabelAdmin)
admin.site.register(Milestone, MilestoneAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(PullRequest, PullRequestAdmin)
admin.site.register(Release, ReleaseAdmin)
admin.site.register(Repository, RepositoryAdmin)
admin.site.register(RepositoryContributor, RepositoryContributorAdmin)
admin.site.register(User, UserAdmin)
