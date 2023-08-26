from os import environ  # pylint: disable=E0611

import httpx
from jinja2 import Environment, FileSystemLoader
from pydantic import EmailStr

MAILTRAP_BEARER_TOKEN = environ["MAILTRAP_BEARER_TOKEN"]
MAILTRAP_API_KEY = environ["MAILTRAP_API_KEY"]
MAILTRAP_API_SEND_URL = "https://send.api.mailtrap.io/api/send"

env = Environment(loader=FileSystemLoader("./app/email_templates/"))

verify_email_template = env.get_template("verify_email.html")
reset_password_email_template = env.get_template("reset_password.html")
new_password_email_template = env.get_template("new_password.html")

APPLICATION_JSON_TYPE = "application/json"


def send_email_verification_mail(
    sender_name: str,
    from_email: str,
    to_email: EmailStr,
    confirm_url: str,
    username: str,
):
    payload = {
        "to": [{"email": to_email}],
        "from": {"email": from_email, "name": sender_name},
        "subject": "Email Verification for Holy Grail",
        "html": verify_email_template.render(
            username=username, confirm_url=confirm_url
        ),
    }

    headers = {
        "Accept": APPLICATION_JSON_TYPE,
        "Api-Token": MAILTRAP_API_KEY,
        "Content-Type": APPLICATION_JSON_TYPE,
    }

    with httpx.Client() as client:
        response = client.post(MAILTRAP_API_SEND_URL, headers=headers, json=payload)
        return response.status_code


def send_reset_password_mail(
    sender_name: str,
    from_email: str,
    to_email: EmailStr,
    confirm_url: str,
    username: str,
):
    payload = {
        "to": [{"email": to_email}],
        "from": {"email": from_email, "name": sender_name},
        "subject": "Password Reset for Holy Grail",
        "html": reset_password_email_template.render(
            username=username, confirm_url=confirm_url
        ),
    }

    headers = {
        "Accept": APPLICATION_JSON_TYPE,
        "Api-Token": MAILTRAP_API_KEY,
        "Content-Type": APPLICATION_JSON_TYPE,
    }

    with httpx.Client() as client:
        response = client.post(MAILTRAP_API_SEND_URL, headers=headers, json=payload)
        return response.status_code


def send_new_password_mail(
    sender_name: str, from_email: str, to_email: EmailStr, username: str, password: str
):
    payload = {
        "to": [{"email": to_email}],
        "from": {"email": from_email, "name": sender_name},
        "subject": "New Password for Holy Grail",
        "html": new_password_email_template.render(
            username=username, password=password
        ),
    }

    headers = {
        "Accept": APPLICATION_JSON_TYPE,
        "Api-Token": MAILTRAP_API_KEY,
        "Content-Type": APPLICATION_JSON_TYPE,
    }

    with httpx.Client() as client:
        response = client.post(MAILTRAP_API_SEND_URL, headers=headers, json=payload)
        return response.status_code
