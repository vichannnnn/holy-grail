from pydantic import BaseModel


class User(BaseModel):
    user_id: int
    username: str


class ScoreboardUser(BaseModel):
    user: User
    upload_count: int
