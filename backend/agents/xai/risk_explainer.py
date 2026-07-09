class RiskExplainer:

    def explain(self, commander):

        risk = commander.get("enterprise_risk", {})

        return {

            "score":

                risk.get("score",0),

            "reasoning":[

                f"Enterprise risk score {risk.get('score',0)}.",

                f"Business impact {risk.get('business_impact','Unknown')}.",

                f"Likelihood {risk.get('likelihood','Unknown')}."

            ]

        }