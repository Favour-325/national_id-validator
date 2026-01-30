from typing import Optional
from pydantic import BaseModel
from datetime import date
from .models import Gender


class ValidationRequest(BaseModel):
    id_number: str


class Citizen(BaseModel):
    id_number: str
    full_name: str
    date_of_birth: date
    gender: Gender
    region: str
    nationality: str

    class Config:
        from_attributes = True


class CitizenRead(Citizen):
    is_active: bool
