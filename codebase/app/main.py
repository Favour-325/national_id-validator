from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
import re

app = FastAPI(
    title="National ID Validator"
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)


@app.get('/', response_model=list[schemas.CitizenRead])
def get_all(db: Session = Depends(get_db)):
    return db.query(models.Citizen).all()


@app.post('/', response_model=schemas.CitizenRead)
def validate(data: schemas.ValidationRequest, db: Session = Depends(get_db)):
    id_number = data.id_number

    if re.match(r"^CAM-\d{6}$", id_number) == None:
        raise HTTPException(status_code=406, detail="Invalid ID number")

    else:
        db_data = db.query(models.Citizen).filter(models.Citizen.id_number==id_number).first()
        
        if db_data == None:
            raise HTTPException(status_code=404, detail="ID does not exist")
        
        return db_data
        

@app.post("/create", response_model=schemas.CitizenRead)
def create(data: schemas.Citizen, db: Session = Depends(get_db)):
    if re.match(r"^CAM-\d{6}$", data.id_number) == None:
        raise HTTPException(status_code=406, detail="Invalid ID")
    
    db_data = models.Citizen(**data.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)

    return db_data


@app.delete('/delete', status_code=204)
def delete(id, db: Session = Depends(get_db)):
    db_data = db.query(models.Citizen).filter(models.Citizen.id_number==id).first()
        
    if db_data == None:
        raise HTTPException(status_code=404, detail="ID does not exist")
    
    else:
        db.delete(db_data)
        db.commit()
    
