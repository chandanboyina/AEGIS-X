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
        # Threat Intelligence
        # -----------------------------

        threat = incident.get(
            "intelligence",
            {}

        ).get(
            "threat",
            {}
        )

        correlation = threat.get(
            "score",
            0
        )

        intel = threat.get(
            "intelligence",
            {}
        )

        cves = intel.get(
            "cves",
            []
        )

        certin = intel.get(
            "certin",
            []
        )

        cisa = intel.get(
            "cisa",
            []
        )

        vendor = intel.get(
            "vendor",
            []
        )

        exploitdb = intel.get(
            "exploitdb",
            []
        )

        # -----------------------------
        # Enterprise Risk Calculation
        # -----------------------------

        enterprise_score = (

            observer * 0.25 +

            mitre * 0.15 +

            investigation * 0.15 +

            ioc_density * 0.10 +

            severity * 0.10 +

            correlation * 0.15 +

            (100 if exploitdb else 0) * 0.05 +

            (100 if cisa else 0) * 0.03 +

            (100 if certin else 0) * 0.01 +

            (100 if vendor else 0) * 0.01

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

                "severity": severity,

                "correlation": correlation,

                "cves": len(cves),

                "certin": len(certin),

                "cisa": len(cisa),

                "vendor": len(vendor),

                "exploitdb": len(exploitdb)

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

                f"Enterprise Risk {enterprise['enterprise_score']}/100.",

                f"Threat Correlation {enterprise['breakdown']['correlation']}/100.",

                f"{enterprise['breakdown']['exploitdb']} public exploit(s) available.",

                f"{enterprise['breakdown']['cisa']} CISA KEV advisory matched."

            ],

            "evidence":

                enterprise["breakdown"],

            "timestamp":

                enterprise["generated_at"]

        }