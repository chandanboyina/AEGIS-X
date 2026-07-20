from fastapi import APIRouter
from services.council_service import CouncilService
from services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/council",
    tags=["Council"]
)

service = CouncilService()
dashboard_service = DashboardService() # Initialize the service to fetch data

@router.get("")
def council():
    # 1. Fetch the latest packet
    packet = dashboard_service.latest_packet()
    
    # 2. Check if packet is a string (error) or None
    if isinstance(packet, str) or packet is None:
        return {"error": "Telemetry data currently unavailable"}
        
    # 3. Pass the packet to the build method
    return service.build(packet)