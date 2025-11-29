## MediNest Backend (FastAPI)

**Tech stack**: FastAPI, SQLite (via SQLAlchemy), JWT auth, Gemini integration proxy.

### Setup

1. Create and activate a virtual environment (optional but recommended).
2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Configure environment variables (create a `.env` or export in shell):

- **JWT_SECRET_KEY** – any long random string (for signing tokens).
- **DATABASE_URL** – optional, default is `sqlite:///./medinest.db`.
- **GEMINI_API_KEY** – your Google Gemini API key (if omitted, backend uses local fallback logic).

### Run the API

```bash
uvicorn backend.main:app --reload
```

API will default to `http://127.0.0.1:8000`.

### Main Endpoints

- **Health**: `GET /health`
- **Auth**:
  - `POST /auth/signup` – body: `{ "name", "email", "password" }`
  - `POST /auth/login` (OAuth2 form) – fields: `username` (email), `password` → returns JWT.
- **Profile** (requires `Authorization: Bearer <token>`):
  - `GET /profile/me`
  - `PUT /profile/me` – body matches the frontend `userProfile` shape.
- **Insurance**:
  - `GET /insurance/plans`
  - `GET /insurance/plans/{id}`
- **Recommendations**:
  - `POST /recommendations` – body: `{ "profile": { ...userProfile } }` → returns 3 AI recommendations (Gemini or local fallback).


