from fastapi import APIRouter

from services.cache_service import CacheService

router = APIRouter(
    prefix="/cache",
    tags=["Cache"]
)

service = CacheService()


@router.get("/latest")
def latest():

    return service.latest()


@router.get("/history")
def history():

    return service.history()


@router.get("/stats")
def stats():

    return service.stats()