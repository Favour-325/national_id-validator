import sys
from os.path import abspath, dirname

# This adds the parent directory of 'alembic' to your sys.path
sys.path.insert(0, abspath(dirname(dirname(__file__))))

# Now your existing imports should work
from sqlalchemy import Column, Integer, String, Boolean, Date, Enum
import enum
from app.database import Base

class Gender(enum.Enum):
    MALE = "Male"
    FEMALE = "Female"

class Citizen(Base):
    __tablename__ = "citizens"

    id = Column(Integer, primary_key=True)
    id_number = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(Enum(Gender), nullable=False)
    region = Column(String, nullable=False)
    nationality = Column(String, nullable=False, default="Cameroonian")
    is_active = Column(Boolean, default=True)
