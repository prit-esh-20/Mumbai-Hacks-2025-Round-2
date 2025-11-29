from fastapi import APIRouter

from .. import schemas

router = APIRouter()


INSURANCE_PLANS = [
    {
        "id": 1,
        "name": "Care Plus",
        "provider": "Care Health",
        "premium": 12500,
        "coverage": 500000,
        "features": ["No Copay", "Free Health Checkup", "Cashless Treatment", "Global Coverage"],
    },
    {
        "id": 2,
        "name": "Optima Restore",
        "provider": "HDFC ERGO",
        "premium": 15000,
        "coverage": 1000000,
        "features": ["Restore Benefit", "2x Coverage", "No Claim Bonus", "Daily Cash"],
    },
    {
        "id": 3,
        "name": "Health Companion",
        "provider": "Niva Bupa",
        "premium": 11000,
        "coverage": 500000,
        "features": ["Direct Claim Settlement", "Refill Benefit", "Alternative Treatment"],
    },
    {
        "id": 4,
        "name": "Activ Health",
        "provider": "Aditya Birla",
        "premium": 13500,
        "coverage": 700000,
        "features": ["Chronic Management", "Health Returns", "Day Care Procedures"],
    },
    {
        "id": 5,
        "name": "Young Star",
        "provider": "Star Health",
        "premium": 9000,
        "coverage": 300000,
        "features": ["Mid-term Inclusion", "Wellness Program", "E-Medical Opinion"],
    },
    {
        "id": 6,
        "name": "ProHealth",
        "provider": "Manipal Cigna",
        "premium": 14000,
        "coverage": 1000000,
        "features": ["Unlimited Restoration", "Healthy Rewards", "Worldwide Emergency"],
    },
]


@router.get("/plans")
def list_plans():
    return INSURANCE_PLANS


@router.get("/plans/{plan_id}")
def get_plan(plan_id: int):
    for plan in INSURANCE_PLANS:
        if plan["id"] == plan_id:
            return plan
    return {"detail": "Plan not found"}


