from datetime import datetime


class FeatureEngine:
    """
    Extracts behavioral features from
    Cyber Evidence Packets.
    """

    SEVERITY_MAP = {
        "LOW": 1,
        "MEDIUM": 2,
        "HIGH": 3,
        "CRITICAL": 4,
    }

    EVENT_TYPE_MAP = {
        "Successful Login": 1,
        "Failed Login": 2,
        "SSH Login": 3,
        "Failed SSH Login": 4,
        "Port Scan": 5,
        "Blocked Connection": 6,
        "Malware Detected": 7,
    }

    @staticmethod
    def extract(packet: dict):

        event = packet["event"]

        features = {

            "severity_score":
                FeatureEngine.SEVERITY_MAP.get(
                    event["severity"].upper(),
                    0
                ),

            "event_type_score":
                FeatureEngine.EVENT_TYPE_MAP.get(
                    event["event_type"],
                    0
                ),

            "description_length":
                len(event["description"]),

            "raw_log_length":
                len(event["raw_log"]),

            "hour":
                datetime.now().hour,

            "business_hours":
                1 if 8 <= datetime.now().hour <= 18 else 0,

        }

        packet["behavior"]["features"] = features

        return packet