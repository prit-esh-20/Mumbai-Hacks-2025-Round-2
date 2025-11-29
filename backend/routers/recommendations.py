import os
from typing import List

import httpx
from fastapi import APIRouter, HTTPException

from .. import schemas

router = APIRouter()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
)


def _build_prompt(user_profile: dict) -> str:
    # Mirror the prompt logic from the frontend llmService
    full_name = user_profile.get("fullName")
    age = user_profile.get("age")
    gender = user_profile.get("gender")
    city = user_profile.get("city")
    conditions = user_profile.get("conditions") or "None"
    hospital = user_profile.get("hospital") or "Any"
    family_members = user_profile.get("familyMembers") or []
    family_str = (
        ", ".join(
            f"{m.get('relation','member')} age {m.get('age')}"
            for m in family_members
        )
        if family_members
        else "None"
    )

    prompt = f"""You are an expert health insurance advisor AI. Analyze the following complete health profile and generate 3 personalized insurance plan recommendations.

USER HEALTH PROFILE:
- Name: {full_name}
- Age: {age} years
- Gender: {gender}
- City/Location: {city}
- Pre-existing Conditions/Diseases: {conditions}
- Preferred Hospital: {hospital}
- Family Members: {len(family_members)} ({family_str})

STRICT REQUIREMENTS:
1. Base ALL recommendations on the user's specific diseases, age, and health conditions listed above
2. Each recommendation MUST be different and personalized to their exact health profile
3. If they have diabetes, hypertension, or other conditions - recommendations MUST address these specifically
4. DO NOT give generic advice - every recommendation should reference their actual conditions
5. Consider their age, location, and family situation
6. Provide realistic premium estimates based on their risk profile

RETURN FORMAT (JSON):
Return ONLY a valid JSON array with exactly 3 recommendations. Each recommendation must have:
{{
  "name": "Plan Name",
  "provider": "Insurance Provider",
  "premium": number (annual premium in INR),
  "coverage": number (coverage amount in INR),
  "score": number (1-100 match score),
  "matchReason": "Why this plan suits their SPECIFIC conditions and profile",
  "features": ["feature1", "feature2", "feature3"],
  "coverageDetails": "What this covers for their specific diseases",
  "exclusions": "Important exclusions related to their conditions",
  "riskFactors": "Risk factors based on their health profile"
}}

IMPORTANT: Return ONLY the JSON array, no other text. Make sure each plan is truly personalized to their conditions."""
    return prompt


def _local_fallback(profile: dict) -> List[schemas.Recommendation]:
    # Adapted from frontend generateLocalFallback
    conditions = (profile.get("conditions") or "").lower()
    age = int(profile.get("age") or 30)
    has_diabetes = "diabetes" in conditions or "sugar" in conditions
    has_bp = any(x in conditions for x in ["bp", "hypertension", "pressure"])
    has_heart = any(x in conditions for x in ["heart", "cardio"])

    base_premium = 10000 + (age * 200)
    if has_diabetes:
        base_premium += 5000
    if has_bp:
        base_premium += 3000
    if has_heart:
        base_premium += 8000

    recs: List[schemas.Recommendation] = []

    name = (
        "Diabetes Care Pro"
        if has_diabetes
        else ("Heart Secure Gold" if has_heart else "Optima Restore")
    )
    provider = "Care Health" if has_diabetes else ("Star Health" if has_heart else "HDFC ERGO")
    match_reason = (
        "Specifically designed for diabetes management with coverage for insulin and regular checkups."
        if has_diabetes
        else (
            "Specialized cardiac care coverage essential for your heart condition."
            if has_heart
            else f"Best comprehensive coverage for your age group in {profile.get('city')}"
        )
    )
    features = [
        "Insulin Cover" if has_diabetes else "No Claim Bonus",
        "Cashless Treatment",
        "Annual Health Checkup",
    ]
    coverage_details = (
        "Covers hospitalization due to diabetes complications and insulin costs."
        if has_diabetes
        else "Comprehensive hospitalization coverage including pre/post expenses."
    )
    risk_factors = (
        "Higher premium due to pre-existing conditions."
        if (has_diabetes or has_bp or has_heart)
        else "Standard risk profile for your age."
    )

    recs.append(
        schemas.Recommendation(
            name=name,
            provider=provider,
            premium=base_premium,
            coverage=1_000_000,
            score=95,
            matchReason=match_reason,
            features=features,
            coverageDetails=coverage_details,
            exclusions="Waiting period of 2 years for pre-existing conditions.",
            riskFactors=risk_factors,
        )
    )

    recs.append(
        schemas.Recommendation(
            name="Health Companion",
            provider="Niva Bupa",
            premium=base_premium * 0.8,
            coverage=500_000,
            score=88,
            matchReason="Most cost-effective option providing essential coverage for your needs.",
            features=["Refill Benefit", "Direct Claim Settlement", "Tax Benefit"],
            coverageDetails="Standard hospitalization coverage with refill benefit.",
            exclusions="Cosmetic treatments and non-medical expenses.",
            riskFactors="Lower coverage amount might be insufficient for major surgeries.",
        )
    )

    recs.append(
        schemas.Recommendation(
            name="ReAssure 2.0",
            provider="Niva Bupa",
            premium=base_premium * 1.3,
            coverage=2_500_000,
            score=82,
            matchReason="Maximum coverage with unlimited restoration, ideal for long-term security.",
            features=["Unlimited Restoration", "Lock the Clock", "Booster Benefit"],
            coverageDetails="Extensive coverage for all major illnesses and modern treatments.",
            exclusions="Experimental treatments.",
            riskFactors="Higher premium cost.",
        )
    )

    return recs


@router.post("/", response_model=list[schemas.Recommendation])
async def generate_recommendations(req: schemas.RecommendationRequest):
    profile = req.profile

    if not GEMINI_API_KEY:
        # No key configured, always fallback
        return _local_fallback(profile)

    prompt = _build_prompt(profile)

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
                json={
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": prompt,
                                }
                            ]
                        }
                    ]
                },
            )
        if response.status_code != 200:
            # Fallback to local logic on any error
            return _local_fallback(profile)

        data = response.json()
        generated_text = (
            data.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text")
        )
        if not generated_text:
            return _local_fallback(profile)

        json_text = generated_text.strip()
        if json_text.startswith("```json"):
            json_text = json_text.replace("```json", "").replace("```", "").strip()
        elif json_text.startswith("```"):
            json_text = json_text.replace("```", "").strip()

        import json as _json

        rec_list = _json.loads(json_text)
        if not isinstance(rec_list, list) or not rec_list:
            raise ValueError("Invalid recommendations format")

        # Validate into schema
        return [schemas.Recommendation(**rec) for rec in rec_list]
    except Exception:
        # Any failure -> local fallback
        return _local_fallback(profile)


