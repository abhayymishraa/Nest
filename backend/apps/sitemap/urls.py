"""URL configuration for sitemap endpoints in the sitemaps app."""

from django.urls import path

from .views import (
    ChapterSitemap,
    CommitteeSitemap,
    MemberSitemap,
    ProjectSitemap,
    StaticSitemap,
    cached_sitemap_view,
)

sitemaps = {
    "chapters": ChapterSitemap,
    "committees": CommitteeSitemap,
    "members": MemberSitemap,
    "projects": ProjectSitemap,
    "static": StaticSitemap,
}

urlpatterns = [
    path(
        "sitemap.xml",
        cached_sitemap_view(sitemaps=sitemaps),
    ),
    path(
        "sitemap/chapters.xml",
        cached_sitemap_view(sitemaps={"chapters": ChapterSitemap}),
    ),
    path(
        "sitemap/committees.xml",
        cached_sitemap_view(sitemaps={"committees": CommitteeSitemap}),
    ),
    path(
        "sitemap/members.xml",
        cached_sitemap_view(sitemaps={"members": MemberSitemap}),
    ),
    path(
        "sitemap/projects.xml",
        cached_sitemap_view(sitemaps={"projects": ProjectSitemap}),
    ),
    path(
        "sitemap/static.xml",
        cached_sitemap_view(sitemaps={"static": StaticSitemap}),
    ),
]
