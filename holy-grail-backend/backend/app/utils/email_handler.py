from os import environ  # pylint: disable=E0611
import httpx
from pydantic import EmailStr

MAILTRAP_BEARER_TOKEN = environ["MAILTRAP_BEARER_TOKEN"]
MAILTRAP_API_KEY = environ["MAILTRAP_API_KEY"]
MAILTRAP_API_SEND_URL = "https://send.api.mailtrap.io/api/send"


def send_email_verification_mail(
    sender_name: str,
    from_email: str,
    to_email: EmailStr,
    confirm_url: str,
    username: str,
):
    with open("email_templates/verify_email.html") as f:
        html = f.read()

    payload = {
        "to": [{"email": to_email}],
        "from": {"email": from_email, "name": sender_name},
        "subject": "Email Verification for Holy Grail",
        "text": f"Hi {username}, \n\nPlease verify your email address by clicking on this URL: {confirm_url}",
        "html": html.replace("{{{username}}}", username).replace(
            "{{{confirm_url}}}", confirm_url
        ),
    }

    headers = {
        "Accept": "application/json",
        "Api-Token": MAILTRAP_API_KEY,
        "Content-Type": "application/json",
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
    with open("email_templates/reset_password.html") as f:
        html = f.read()

    payload = {
        "to": [{"email": to_email}],
        "from": {"email": from_email, "name": sender_name},
        "subject": "Password Reset for Holy Grail",
        "text": f"Hi {username}, \n\nPlease reset your password by clicking on this URL: {confirm_url}",
        "html": html.replace("{{{username}}}", username).replace(
            "{{{confirm_url}}}", confirm_url
        ),
    }

    headers = {
        "Accept": "application/json",
        "Api-Token": MAILTRAP_API_KEY,
        "Content-Type": "application/json",
    }

    with httpx.Client() as client:
        response = client.post(MAILTRAP_API_SEND_URL, headers=headers, json=payload)
        return response.status_code


def send_new_password_mail(
    sender_name: str, from_email: str, to_email: EmailStr, username: str, password: str
):
    with open("email_templates/new_password.html") as f:
        html = f.read()

    payload = {
        "to": [{"email": to_email}],
        "from": {"email": from_email, "name": sender_name},
        "subject": "Your New Password for Holy Grail",
        "text": f"Hi {username}, \n\nThis is your temporary password: \n\n"
        f"{password}\n\n"
        f"Please make sure to change your password ASAP after you log in.",
        "html": html.replace("{{{username}}}", username).replace(
            "{{{password}}}", password
        ),
    }

    headers = {
        "Accept": "application/json",
        "Api-Token": MAILTRAP_API_KEY,
        "Content-Type": "application/json",
    }

    with httpx.Client() as client:
        response = client.post(MAILTRAP_API_SEND_URL, headers=headers, json=payload)
        return response.status_code
