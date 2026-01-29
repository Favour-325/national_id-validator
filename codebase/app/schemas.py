from pydantic import BaseModel
from datetime import date
from .models import Gender


class Citizen(BaseModel):
    id_number: str
    full_name: str
    date_of_birth: date
    gender: Gender
    region: str
    nationality: str

    class Config:
        orm_mode = True


class CitizenRead(Citizen):
    is_active: bool
