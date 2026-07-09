from collectors.windows_event_catalog import EVENT_CATALOG
from collectors.mitre_mapper import MitreMapper


class WindowsParser:
    """
    Enterprise Windows Event Parser
    """

    def __init__(self):

        self.mitre = MitreMapper()

    def parse(self, log):

        event_id = log.get(
            "event_id",
            0
        )

        info = EVENT_CATALOG.get(

            event_id,

            {

                "name": log.get(
                    "event",
                    "Unknown"
                ),

                "category": "Unknown",

                "severity": log.get(
                    "severity",
                    "INFO"
                ),

                "risk": 30

            }

        )

        mitre = self.mitre.map(
            event_id
        )

        return {

            "timestamp":

                log.get("timestamp"),

            "collector":

                "Windows",

            "source":

                log.get(
                    "source",
                    "Windows"
                ),

            "asset":

                log.get("asset"),

            "hostname":

                log.get(
                    "asset"
                ),

            "user":

                log.get("user"),

            "source_ip":

                log.get("source_ip"),

            "destination_ip":

                log.get("destination_ip"),

            "event":

                info["name"],

            "event_name":

                info["name"],

            "event_id":

                event_id,

            "category":

                info["category"],

            "severity":

                info["severity"],

            "risk_score":

                info["risk"],

            "confidence":

                min(
                    95,
                    info["risk"]
                ),

            "mitre":

                mitre,

            "raw":

                log

        }