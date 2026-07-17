from fastapi import APIRouter

from services.topology_service import TopologyService

router = APIRouter(
    prefix="/topology",
    tags=["Topology"]
)

service = TopologyService()


@router.get("")
def topology():

    return service.build()