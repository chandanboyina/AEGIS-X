from fastapi import APIRouter
from services.timeline_service import TimelineService
from services.dashboard_service import DashboardService

router = APIRouter(prefix="/timeline", tags=["Timeline"])
service = TimelineService()
dashboard_service = DashboardService()

@router.get("")
def timeline():
    packet = dashboard_service.latest_packet()
    
    # Always validate the packet
    if isinstance(packet, str) or packet is None:
        return {"error": "Telemetry data unavailable"}
        
    return service.build(packet)