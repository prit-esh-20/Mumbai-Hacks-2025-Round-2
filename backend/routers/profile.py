import json

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth_utils import get_current_user
from ..database import get_db

router = APIRouter()


@router.get("/me", response_model=schemas.UserProfileOut)
def get_my_profile(
    db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)
):
    profile = (
        db.query(models.UserProfile)
        .filter(models.UserProfile.user_id == current_user.id)
        .first()
    )
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found"
        )

    family_members = (
        json.loads(profile.family_members_json)
        if profile.family_members_json
        else []
    )

    return {
        "id": profile.id,
        "fullName": profile.full_name,
        "age": profile.age,
        "gender": profile.gender,
        "city": profile.city,
        "conditions": profile.conditions,
        "hospital": profile.hospital,
        "familyMembers": family_members,
    }


@router.put("/me", response_model=schemas.UserProfileOut)
def upsert_my_profile(
    profile_in: schemas.UserProfileIn,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    profile = (
        db.query(models.UserProfile)
        .filter(models.UserProfile.user_id == current_user.id)
        .first()
    )

    if not profile:
        profile = models.UserProfile(user_id=current_user.id)

    profile.full_name = profile_in.fullName
    profile.age = profile_in.age
    profile.gender = profile_in.gender
    profile.city = profile_in.city
    profile.conditions = profile_in.conditions
    profile.hospital = profile_in.hospital
    profile.family_members_json = json.dumps(
        [fm.dict() for fm in profile_in.familyMembers]
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return {
        "id": profile.id,
        "fullName": profile.full_name,
        "age": profile.age,
        "gender": profile.gender,
        "city": profile.city,
        "conditions": profile.conditions,
        "hospital": profile.hospital,
        "familyMembers": json.loads(profile.family_members_json or "[]"),
    }


