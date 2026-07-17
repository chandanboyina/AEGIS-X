from fastapi import APIRouter

from services.metrics_service import MetricsService
from core.packet_cache import packet_cache

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"]
)

service = MetricsService()


@router.get("")
def metrics():

    packet = packet_cache.get()

    if packet is None:
        return {}

    return service.build(packet)