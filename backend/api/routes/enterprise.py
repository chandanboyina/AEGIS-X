from fastapi import APIRouter

from services.enterprise_status_service import EnterpriseStatusService

router = APIRouter(
    prefix="/enterprise",
    tags=["Enterprise"]
)

service = EnterpriseStatusService()


@router.get("/status")
def status():

    return service.build()