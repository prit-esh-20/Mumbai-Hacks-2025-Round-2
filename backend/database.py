from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./medinest.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    from fastapi import Depends

    def _get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    return Depends(_get_db)


def init_db():
    # Import models so that Base.metadata creates their tables
    from . import models  # noqa: F401

    Base.metadata.create_all(bind=engine)


