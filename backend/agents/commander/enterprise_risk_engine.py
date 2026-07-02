class EnterpriseRiskEngine:
    """
    Enterprise Risk Engine

    Calculates the overall enterprise risk score
    using multiple AI intelligence sources.
    """

    severity_scores = {

        "LOW": 25,

        "MEDIUM": 50,

        "HIGH": 75,

        "CRITICAL": 100

    }

    def calculate(self, incident):

        # -----------------------------
        # Intelligence Sources
        # -----------------------------

        observer = incident["observer_confidence"]

        mitre = incident["mitre_confidence"]

        investigation = incident["investigation_summary"]["risk_score"]

        severity = self.severity_scores.get(

            incident["severity"],

            25

        )

        ioc_density = min(

            len(incident["ioc_list"]) * 10,

            100

        )

        # -----------------------------
        # Enterprise Risk Calculation
        # -----------------------------

        enterprise_score = (

            observer * 0.30 +

            mitre * 0.20 +

            investigation * 0.20 +

            ioc_density * 0.15 +

            severity * 0.15

        )

        enterprise_score = round(enterprise_score)

        enterprise_score = max(

            0,

            min(enterprise_score, 100)

        )

        # -----------------------------
        # Return Result
        # -----------------------------

        return {

            "enterprise_score": enterprise_score,

            "breakdown": {

                "observer": observer,

                "mitre": mitre,

                "investigation": investigation,

                "ioc_density": ioc_density,

                "severity": severity

            }

        }
    
    def vote(self, enterprise):

        return {

            "agent": "Enterprise Risk",

            "recommendation":

                "Risk Assessment",

            "confidence":

                enterprise["enterprise_score"],

            "weight": 0.05,

            "reason": [

                f"Enterprise Risk "

                f"{enterprise['enterprise_score']}/100"

            ],

            "evidence":

                enterprise["breakdown"],

            "timestamp":

                enterprise["generated_at"]

        }