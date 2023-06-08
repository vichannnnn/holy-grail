from os import environ

import httpx
from pydantic import EmailStr

MAILTRAP_BEARER_TOKEN = environ["MAILTRAP_BEARER_TOKEN"]


async def send_mail(sender_name: str, from_email: str, to_email: EmailStr, confirm_url: str,
                    username: str):
    url = "https://send.api.mailtrap.io/api/send"

    payload = {
        "from": {
            "email": from_email,
            "name": sender_name
        },
        "to": [
            {
                "email": to_email
            }
        ],
        "subject": "Email Verification for Holy Grail",
        "text": f"Hi {username}, \n\nPlease verify by clicking on this URL: {confirm_url}",
    }

    headers = {
        "Authorization": f"Bearer {MAILTRAP_BEARER_TOKEN}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        return response.status_code
