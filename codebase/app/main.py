from fastapi import FastAPI, Depends, APIRouter
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db

app = FastAPI(
    title="National ID Validator"
)

router = APIRouter(
    tags=["Validator"],
    prefix="/validate"
)

@app.get('/')
def root():
    return "Welcome to the home page"

@app.post('/', response_model=schemas.CitizenRead)
def validate(data: schemas.Citizen, db: Session = Depends(get_db)):
    id_number = data.id_number


@app.post("/create", response_model=schemas.CitizenRead)
def create(data: schemas.Citizen, db: Session = Depends(get_db)):
    db_data = models.Citizen(**data.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)

    return db_data
