from unittest.mock import MagicMock, patch

import pytest

from apps.github.api.user import UserSerializer


class TestUserSerializer:
    @pytest.mark.parametrize(
        "user_data",
        [
            {
                "name": "John Doe",
                "login": "johndoe",
                "company": "GitHub",
                "location": "San Francisco",
                "created_at": "2024-12-30T00:00:00Z",
                "updated_at": "2024-12-30T00:00:00Z",
            },
            {
                "name": "Jane Smith",
                "login": "janesmith",
                "company": "Microsoft",
                "location": "Redmond",
                "created_at": "2024-12-29T00:00:00Z",
                "updated_at": "2024-12-30T00:00:00Z",
            },
        ],
    )
    # Ensures that test runs without actual database access by simulating behavior of a queryset.
    @patch("apps.github.models.user.User.objects.filter")
    def test_user_serializer(self, mock_filter, user_data):
        mock_qs = MagicMock()
        # To mimic a queryset where no matching objects are found.
        mock_qs.exists.return_value = False
        mock_filter.return_value = mock_qs

        serializer = UserSerializer(data=user_data)
        assert serializer.is_valid()
        validated_data = serializer.validated_data

        validated_data["created_at"] = (
            validated_data["created_at"].isoformat().replace("+00:00", "Z")
        )
        validated_data["updated_at"] = (
            validated_data["updated_at"].isoformat().replace("+00:00", "Z")
        )
        assert validated_data == user_data