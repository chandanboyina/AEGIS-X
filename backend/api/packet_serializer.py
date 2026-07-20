from models.dashboard_packet import DashboardPacket
from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard", response_model=DashboardPacket)

class PacketSerializer:
    """
    Converts the complete Enterprise Packet
    into a dashboard-friendly format.

    This becomes the single interface
    between the backend AI and frontend UI.
    """

    def serialize(self, packet):
        """
        Maps the flat enterprise packet structure to the DashboardPacket model.
        """
        try:
            # 1. Map Incident Data (Pulled from root)
            incident_summary = {
                "incident_id": packet.get("incident_id"),
                "category": packet.get("category"),
                "severity": packet.get("severity"),
                "status": packet.get("status"),
                "assigned_team": packet.get("assigned_team"),
                "assigned_owner": packet.get("assigned_owner"),
                "created": packet.get("created"),
            }

            # 2. Map Commander Data
            commander_summary = packet.get("commander", {})
            if not isinstance(commander_summary, dict):
                commander_summary = {}

            # 3. Map Brain Data
            brain = packet.get("brain", {})
            brain_summary = {
                "history": brain.get("history", []),
                "similar": brain.get("similar", {}),
            }

            # 4. Return the constructed Pydantic model
            return DashboardPacket(
                metadata=packet.get("metadata", {}),
                pipeline=packet.get("pipeline", {}),
                trace=packet.get("trace", []),
                enterprise=packet.get("enterprise", {}),
                observer=packet.get("observer", {}),
                behavior=packet.get("behavior", {}),
                correlation=packet.get("correlation", {}),
                oracle=packet.get("oracle", {}),
                sentinel=packet.get("sentinel", {}),
                incident=incident_summary,
                commander=commander_summary,
                council=packet.get("council", {}),
                brain=brain_summary,
                cyber_dna=packet.get("cyber_dna", {}),
                digital_twin=packet.get("digital_twin", {}),
                audit=packet.get("audit_trail", [])
            )
            
        except Exception as e:
            # If initialization fails, return a dictionary that describes the error
            # so you can see exactly which field is failing in the browser response.
            return {"error": "Serialization failed", "details": str(e)}