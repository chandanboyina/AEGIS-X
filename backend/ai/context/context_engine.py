from datetime import datetime


class ContextEngine:
    """
    Enriches a Cyber Evidence Packet with
    mission and operational context.
    """

    BUSINESS_START = 8
    BUSINESS_END = 18

    @staticmethod
    def enrich(packet: dict):

        asset = packet["asset"]

        current_hour = datetime.now().hour

        business_hours = (
            ContextEngine.BUSINESS_START
            <= current_hour
            <= ContextEngine.BUSINESS_END
        )

        mission = "Unknown"

        if asset.get("department") == "Education":
            mission = "National Board Examination"

        elif asset.get("department") == "Health":
            mission = "Hospital Operations"

        elif asset.get("department") == "Power":
            mission = "Power Grid"

        packet["context"] = {

            "business_hours": business_hours,

            "current_hour": current_hour,

            "mission": mission,

            "criticality": asset.get(
                "criticality",
                "Unknown",
            ),

            "department": asset.get(
                "department",
                "Unknown",
            ),

            "risk_multiplier": (
                2.0
                if asset.get("criticality") == "Critical"
                else 1.0
            ),

        }

        return packet