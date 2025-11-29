from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, profile, insurance, recommendations


def create_app() -> FastAPI:
    app = FastAPI(title="MediNest API", version="1.0.0")

    # CORS for local frontend dev
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth.router, prefix="/auth", tags=["auth"])
    app.include_router(profile.router, prefix="/profile", tags=["profile"])
    app.include_router(insurance.router, prefix="/insurance", tags=["insurance"])
    app.include_router(
        recommendations.router, prefix="/recommendations", tags=["recommendations"]
    )

    @app.get("/health", tags=["system"])
    async def health():
        return {"status": "ok"}

    return app


app = create_app()


