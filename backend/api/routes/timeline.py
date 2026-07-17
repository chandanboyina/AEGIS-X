from fastapi import APIRouter

from services.timeline_service import TimelineService

router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"]
)

service = TimelineService()


@router.get("")
def timeline():

    return service.build()