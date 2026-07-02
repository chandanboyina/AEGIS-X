from agents.infrastructure.impact_estimator import ImpactEstimator


class InvestigationSummary:
    """
    Generates the enterprise investigation summary.

    This summary is consumed by:
    - Commander AI
    - Business Impact Engine
    - Enterprise Risk Engine
    - Threat Hunter
    - Executive Dashboard
    """

    def __init__(self):

        self.estimator = ImpactEstimator()

    def build(self, incident):

        category = incident["category"]

        priority = incident["severity"]

        # ----------------------------------------
        # Enterprise Impact Estimation
        # ----------------------------------------

        impact = self.estimator.estimate(
            incident
        )

        # ----------------------------------------
        # Risk Score
        # ----------------------------------------

        risk_scores = {

            "MEDIUM": 60,

            "HIGH": 82,

            "CRITICAL": 96

        }

        # ----------------------------------------
        # MITRE Stage
        # ----------------------------------------

        mitre_stage = {

            "Reconnaissance": "Reconnaissance",

            "Credential Access": "Credential Access",

            "Privilege Escalation": "Privilege Escalation",

            "Malware": "Execution",

            "Ransomware": "Impact"

        }

        # ----------------------------------------
        # IOC Statistics
        # ----------------------------------------

        ioc_count = len(
            incident["ioc_list"]
        )

        ioc_types = []

        for ioc in incident["ioc_list"]:

            if ioc["type"] not in ioc_types:

                ioc_types.append(
                    ioc["type"]
                )

        # ----------------------------------------
        # Investigation Summary
        # ----------------------------------------

        return {

            "risk_score":

                risk_scores.get(
                    priority,
                    50
                ),

            "confidence":

                "High",

            "mitre_stage":

                mitre_stage.get(
                    category,
                    "Unknown"
                ),

            "affected_users":

                impact["affected_users"],

            "affected_assets":

                impact["affected_assets"],

            "ioc_count":

                ioc_count,

            "ioc_types":

                ioc_types,

            "estimated_scope":

                (
                    f"{impact['affected_assets']} assets / "
                    f"{impact['affected_users']} users"
                )

        }