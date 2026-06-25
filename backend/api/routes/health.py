from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/")
def health_check():

    return {
        "status": "healthy",
        "service": "AEGIS-X Backend",
        "version": "1.0.0",
    }