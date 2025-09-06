from pydantic import BaseModel, ConfigDict


class CustomBaseModel(BaseModel):
    model_config = ConfigDict(
        arbitrary_types_allowed=True, regex_engine="python-re", from_attributes=True
    )
