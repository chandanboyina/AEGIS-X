class OracleReport:
    """
    Builds Oracle AI Incident Reports.
    """

    def generate(self, packet):

        oracle = packet["oracle"]

        asset = packet["asset"]

        event = packet["event"]

        return {

            "title":
                "Oracle AI Incident Report",

            "summary": {

                "incident_id":
                    oracle["incident_id"],

                "asset":
                    asset["hostname"],

                "event":
                    event["event_type"],

                "category":
                    oracle["category"],

                "threat_level":
                    oracle["threat_level"],

                "priority":
                    oracle["priority"],

                "status":
                    oracle["status"],

                "confidence":
                    oracle["confidence"],

                "mitre_id":

                    oracle["mitre"]["id"],

                "mitre_technique":

                    oracle["mitre"]["technique"],

                "mitre_tactic":

                    oracle["mitre"]["tactic"],

                "overall_risk":

                    oracle.get(

                        "overall_risk",

                        0

                    ),

                "recommended_action":

                    oracle.get(

                        "recommended_action",

                        "Monitor"

                    ),

            },

            "reasoning":

                oracle["reasoning"],

            "recommendation":

                oracle["recommendation"]

        }