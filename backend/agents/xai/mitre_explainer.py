class MitreExplainer:

    def explain(self, incident):

        mitre = incident.get("mitre", {})

        return {

            "technique":

                mitre.get("id"),

            "tactic":

                mitre.get("tactic"),

            "reasoning":[

                f"Mapped to MITRE technique {mitre.get('id','Unknown')}.",

                f"Tactic: {mitre.get('tactic','Unknown')}.",

                mitre.get(

                    "reason",

                    "Technique identified from enterprise telemetry."

                )

            ]

        }