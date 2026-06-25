from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.config import settings
from api.routes import health_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AEGIS-X Cyber Resilience Platform",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)


@app.get("/")
def root():

    return {
        "message": "Welcome to AEGIS-X",
        "version": settings.APP_VERSION,
    }