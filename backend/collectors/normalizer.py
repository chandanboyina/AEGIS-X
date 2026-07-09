class LogNormalizer:
    """
    Universal Enterprise Log Normalizer

    Converts logs from any collector into one
    enterprise event schema.
    """

    def normalize(
        self,
        event,
        collector="Unknown"
    ):

        severity = str(
            event.get(
                "severity",
                "Medium"
            )
        ).upper()

        severity_score = {

            "LOW": 25,

            "MEDIUM": 50,

            "HIGH": 75,

            "CRITICAL": 100

        }.get(
            severity,
            50
        )

        return {

            # ----------------------------
            # Event Identity
            # ----------------------------

            "timestamp":

                event.get("timestamp"),

            "collector":

                collector,

            "source":

                event.get(
                    "source",
                    collector
                ),

            # ----------------------------
            # Asset
            # ----------------------------

            "asset":

                event.get("asset"),

            "hostname":

                event.get(
                    "hostname",
                    event.get("asset")
                ),

            "user":

                event.get("user"),

            # ----------------------------
            # Network
            # ----------------------------

            "source_ip":

                event.get("source_ip"),

            "destination_ip":

                event.get("destination_ip"),

            # ----------------------------
            # Event
            # ----------------------------

            "event":

                event.get("event"),

            "event_id":

                event.get("event_id"),

            "category":

                event.get(
                    "category",
                    "Unknown"
                ),

            # ----------------------------
            # Severity
            # ----------------------------

            "severity":

                severity,

            "severity_score":

                severity_score,

            # ----------------------------
            # AI Features
            # ----------------------------

            "ioc_count":

                event.get(
                    "ioc_count",
                    0
                ),

            "risk_score":

                event.get(
                    "risk_score",
                    severity_score
                ),

            "confidence":

                event.get(
                    "confidence",
                    50
                ),

            # ----------------------------
            # Raw Event
            # ----------------------------

            "raw": event.get(
                "raw",
                event
            )

        }