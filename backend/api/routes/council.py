from fastapi import APIRouter

from services.council_service import CouncilService

router = APIRouter(
    prefix="/council",
    tags=["Council"]
)

service = CouncilService()


@router.get("")
def council():

    return service.build()