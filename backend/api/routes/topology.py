from fastapi import APIRouter
from services.topology_service import TopologyService
from services.dashboard_service import DashboardService

router = APIRouter(prefix="/topology", tags=["Topology"])
service = TopologyService()
dashboard_service = DashboardService()

@router.get("")
def topology():
    packet = dashboard_service.latest_packet()
    
    # Validate the data
    if isinstance(packet, str) or not packet:
        return {"error": "Telemetry data unavailable"}
        
    # PASS THE PACKET HERE
    return service.build(packet)