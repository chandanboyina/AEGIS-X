class MetricsService:
    """
    Enterprise Metrics.
    """

    def build(self, packet):

        oracle = packet.get(
            "oracle",
            {}
        )

        incident = packet.get(
            "incident",
            {}
        )

        commander = incident.get(
            "commander",
            {}
        )

        incident = packet.get("incident", {})

        council = incident.get(
            "council",
            {}
        )

        return {

            "incident_id":

                incident.get(
                    "incident_id"
                ),

            "category":

                incident.get(
                    "category"
                ),

            "severity":

                incident.get(
                    "severity"
                ),

            "priority":

                oracle.get(
                    "priority"
                ),

            "risk_score":

                oracle.get(
                    "overall_risk"
                ),

            "threat_level":

                oracle.get(
                    "threat_level"
                ),

            "commander_confidence":

                commander.get(
                    "ai_council",
                    {}
                ).get(
                    "confidence"
                ),

            "council_confidence":

                council.get(
                    "confidence"
                ),

            "agreement":

                council.get(
                    "agreement"
                )

        }