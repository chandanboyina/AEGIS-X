from datetime import datetime


class EvidenceBuilder:
    """
    Creates a complete Cyber Evidence Packet
    that all AI agents can understand.
    """

    @staticmethod
    def build(event: dict, asset: dict):

        return {

            "metadata": {

                "generated_at": datetime.utcnow().isoformat(),

                "version": "AEGIS-X 1.0",

            },

            "event": event,

            "asset": asset,

            "behavior": {},

            "mission": {},

            "predictions": {},

            "recommendations": {},

            "audit": []

        }