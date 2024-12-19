# main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from typing import Optional
import uvicorn

# Constants
DATABASE_URL = "postgresql://postgres:postgres@db:5432/postgres""
SECRET_KEY = "123"
ALGORITHM = "HS256"

# Database setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
session = SessionLocal()


class User(Base):
	__tablename__ = "users"
	id = Column(Integer, primary_key=True, index=True)
	username = Column(String, unique=True, index=True)
	password = Column(String)


Base.metadata.create_all(bind=engine)


app = FastAPI()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password: str, hashed_password: str) -> bool:
	return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
	return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[int] = None) -> str:
	to_encode = data.copy()
	if expires_delta:
		to_encode.update({"exp": expires_delta})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Authentication
@app.post("/api/v1/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
	user = session.query(User).filter(User.username == form_data.username).first()
	if not user or not verify_password(form_data.password, user.password):
		raise HTTPException(status_code=400, detail="Incorrect username or password")

	access_token_expires = 3600  # 1 hour
	token = create_access_token(
		data={"sub": user.username}, expires_delta=access_token_expires
	)
	return {"token": token}


# Register a user
@app.post("/api/v1/register")
async def register(username: str, password: str):
	hashed_password = get_password_hash(password)
	db_user = User(username=username, password=hashed_password)
	session.add(db_user)
	session.commit()
	session.refresh(db_user)
	return {"username": username}


@app.get("/api/v1/user")
def get_user_by_username(username):
    user = session.query(User).filter(User.username == username).first()
    return {"username": user.username}


if __name__ == "__main__":
	uvicorn.run(
		"main:app", host="0.0.0.0", port=8080, reload=True, log_config="log.ini"
	)
