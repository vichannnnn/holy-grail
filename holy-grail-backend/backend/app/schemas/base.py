from pydantic import BaseModel
from pydantic import ConfigDict


class CustomBaseModel(BaseModel):
    model_config = ConfigDict(regex_engine="python-re")
