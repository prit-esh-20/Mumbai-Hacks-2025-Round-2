from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    name: str


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class FamilyMember(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    relation: str = "spouse"
    gender: Optional[str] = None
    diseases: List[str] = Field(default_factory=lambda: ["None"])


class UserProfileIn(BaseModel):
    fullName: str
    age: int
    gender: str
    city: str
    conditions: str
    hospital: Optional[str] = None
    familyMembers: List[FamilyMember] = Field(default_factory=list)


class UserProfileOut(UserProfileIn):
    id: int

    class Config:
        orm_mode = True


class Recommendation(BaseModel):
    name: str
    provider: str
    premium: float
    coverage: float
    score: int
    matchReason: str
    features: List[str]
    coverageDetails: Optional[str] = None
    exclusions: Optional[str] = None
    riskFactors: Optional[str] = None


class RecommendationRequest(BaseModel):
    # Accept full profile object from frontend; allow additional keys
    profile: dict[str, Any]


