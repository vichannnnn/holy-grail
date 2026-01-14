import os
from typing import Any

import httpx
from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader("email_service/email_templates/"))


class EmailTaskClient:
    def __init__(self) -> None:
        self.MAILTRAP_API_KEY = os.getenv("MAILTRAP_API_KEY", "")
        self.MAILTRAP_API_SEND_URL = os.getenv(
            "MAILTRAP_API_SEND_URL", "https://send.api.mailtrap.io/api/send"
        )
        self.headers = {
            "Accept": "application/json",
            "Api-Token": self.MAILTRAP_API_KEY,
            "Content-Type": "application/json",
        }
        self.client = httpx.Client(headers=self.headers)

    def _render_template(self, template_name: str, **template_params: Any) -> str:
        template = env.get_template(template_name)
        return template.render(**template_params)

    def _send_email(
        self,
        sender_name: str,
        from_email: str,
        to_email: str,
        subject: str,
        html_content: str,
    ) -> int:
        payload = {
            "to": [{"email": to_email}],
            "from": {"email": from_email, "name": sender_name},
            "subject": subject,
            "html": html_content,
        }

        response = self.client.post(self.MAILTRAP_API_SEND_URL, headers=self.headers, json=payload)
        response.raise_for_status()
        return response.status_code

    def send_verify_account_email(
        self,
        sender_name: str,
        from_email: str,
        to_email: str,
        confirm_url: str,
        username: str,
    ) -> int:
        html_content = self._render_template(
            "verify_email.html", username=username, confirm_url=confirm_url
        )
        return self._send_email(
            sender_name,
            from_email,
            to_email,
            "Email Verification for Holy Grail",
            html_content,
        )

    def send_reset_password_email(
        self,
        sender_name: str,
        from_email: str,
        to_email: str,
        confirm_url: str,
        username: str,
    ) -> int:
        html_content = self._render_template(
            "reset_password.html", username=username, confirm_url=confirm_url
        )
        return self._send_email(
            sender_name,
            from_email,
            to_email,
            "Password Reset for Holy Grail",
            html_content,
        )

    def send_new_password_mail(
        self,
        sender_name: str,
        from_email: str,
        to_email: str,
        username: str,
        password: str,
    ) -> int:
        html_content = self._render_template(
            "new_password.html", username=username, password=password
        )
        return self._send_email(
            sender_name,
            from_email,
            to_email,
            "New Password for Holy Grail",
            html_content,
        )
