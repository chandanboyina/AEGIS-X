from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.config import settings

from database.base import Base
from database.database import engine

import models

#from api.routes import health_router

from api.routes import (
    health_router,
    users_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all database tables
    Base.metadata.create_all(bind=engine)

    print("✓ Database initialized successfully.")
    print("✓ AEGIS-X Backend Started.")

    yield

    print("✓ AEGIS-X Backend Shutdown.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AEGIS-X Cyber Resilience Platform",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)

#milestone 3
app.include_router(users_router)




@app.get("/", tags=["Root"])
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "Running",
        "message": "Welcome to AEGIS-X Cyber Resilience Platform",
    }