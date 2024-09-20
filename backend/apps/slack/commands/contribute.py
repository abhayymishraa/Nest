"""Slack bot contribute command."""

from django.conf import settings
from django.utils.text import Truncator

from apps.common.utils import get_absolute_url
from apps.slack.apps import SlackConfig
from apps.slack.blocks import markdown
from apps.slack.constants import FEEDBACK_CHANNEL_MESSAGE
from apps.slack.utils import escape

COMMAND = "/contribute"
SUMMARY_TRUNCATION_LIMIT = 255
TITLE_TRUNCATION_LIMIT = 80


def handler(ack, command, client):
    """Slack /contribute command handler."""
    from apps.github.models.issue import Issue
    from apps.owasp.api.search.issue import get_issues

    ack()
    if not settings.SLACK_COMMANDS_ENABLED:
        return

    search_query = command["text"]
    search_query_escaped = escape(command["text"])
    blocks = [
        markdown(f"*No results found for `{COMMAND} {search_query_escaped}`*\n"),
    ]

    attributes = [
        "idx_project_name",
        "idx_summary",
        "idx_title",
        "idx_url",
    ]
    if issues := get_issues(search_query, attributes=attributes, limit=10):
        blocks = [
            markdown(
                (
                    f"\n*Here are top 10 most relevant issues "
                    f"that I found based on *\n `{COMMAND} {search_query_escaped}`:\n"
                )
                if search_query_escaped
                else (
                    "\n*Here are top 10 most recent issues:*\n"
                    "You can refine the results by using a more specific query, e.g.\n"
                    f"`{COMMAND} python good first issue`"
                )
            ),
        ]

        for idx, issue in enumerate(issues):
            title_truncated = Truncator(escape(issue["idx_title"])).chars(
                TITLE_TRUNCATION_LIMIT, truncate="..."
            )
            summary_truncated = Truncator(issue["idx_summary"]).chars(
                SUMMARY_TRUNCATION_LIMIT, truncate="..."
            )
            blocks.append(
                markdown(
                    f"\n*{idx + 1}.* <{issue['idx_url']}|*{title_truncated}*>\n"
                    f"{escape(issue['idx_project_name'])}\n"
                    f"{escape(summary_truncated)}\n"
                ),
            )

        blocks.append(
            markdown(
                f"⚠️ *Extended search over {Issue.open_issues_count()} open issues "
                f"is available at <{get_absolute_url('project-issues')}"
                f"?q={search_query}|{settings.SITE_NAME}>*\n"
                f"{FEEDBACK_CHANNEL_MESSAGE}"
            ),
        )

    conversation = client.conversations_open(users=command["user_id"])
    client.chat_postMessage(channel=conversation["channel"]["id"], blocks=blocks)


if SlackConfig.app:
    handler = SlackConfig.app.command(COMMAND)(handler)