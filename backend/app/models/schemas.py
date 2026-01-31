from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_name: str

class AnalysisRequest(BaseModel):
    text: Optional[str] = None
    url: Optional[str] = None
    type: str = "text"  # text, url

class AnalysisResult(BaseModel):
    status: str  # real, fake, warning
    confidence: float
    summary: str
    psychological: dict  # {fear: 10, anger: 20}
