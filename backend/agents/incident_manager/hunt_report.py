class HuntReport:
    """
    Enterprise Threat Hunt Report.
    """

    def build(self, matches):

        report = []

        for incident in matches:

            report.append({

                "incident":
                    incident["incident_id"],

                "asset":
                    incident["asset"],

                "category":
                    incident["category"],

                "severity":
                    incident["severity"],

                "tactic":
                    incident["mitre"]["tactic"],

                "technique":
                    incident["mitre"]["technique"],

                "mitre_id":
                    incident["mitre"]["id"],

                "risk_score": 
                    incident["investigation_summary"]["risk_score"],

            })

        return report