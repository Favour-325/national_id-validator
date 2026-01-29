from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
import re

app = FastAPI(
    title="National ID Validator"
)


@app.get('/', response_model=list[schemas.CitizenRead])
def get_all(db: Session = Depends(get_db)):
    return db.query(models.Citizen).all()


@app.post('/')
def validate(data: str, db: Session = Depends(get_db)):
    id_number = data

    if re.match(r"^CAM-\d{6}", id_number):
        db_data = db.query(models.Citizen).filter(models.Citizen.id_number==id_number).first()
        
        if db_data == None:
            raise HTTPException(status_code=404, detail="No ID found with this ID Number")
        
        return {"Response": "Valid ID"}

    else: 
        return {"Response": "Invalid ID"}
    

@app.post("/create", response_model=schemas.CitizenRead)
def create(data: schemas.Citizen, db: Session = Depends(get_db)):
    db_data = models.Citizen(**data.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)

    return db_data
