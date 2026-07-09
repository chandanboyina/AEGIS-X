from agents.infrastructure.asset_inventory import AssetInventory


class BusinessImpactEngine:


    """
    Enterprise Business Impact Engine

    Calculates realistic business impact using:

    • Enterprise Risk
    • Business Criticality
    • Recovery Complexity
    • Service Cost
    • Affected Systems
    """

    @staticmethod
    def format_money(value):
        return f"₹{value:.2f} Crore"

    def __init__(self):

        self.inventory = AssetInventory()

    def calculate(self, incident, enterprise_risk):

        # ----------------------------------------
        # Asset Profile
        # ----------------------------------------

        profile = self.inventory.get(
            incident["asset"]["hostname"]
        )

        service = profile["service"]

        business_unit = profile["business_unit"]

        criticality = profile["criticality"]

        hourly_cost = profile["hourly_cost"]

        enterprise_users = profile["enterprise_users"]

        # ----------------------------------------
        # Investigation Summary
        # ----------------------------------------

        affected_users = incident["investigation_summary"]["affected_users"]

        affected_servers = incident["investigation_summary"]["affected_assets"]

        # ----------------------------------------
        # Enterprise Risk
        # ----------------------------------------

        risk = enterprise_risk["enterprise_score"]

        # ----------------------------------------
        # Recovery Complexity
        # ----------------------------------------

        complexity = {

            "Reconnaissance": 1,

            "Credential Access": 2,

            "Privilege Escalation": 3,

            "Malware": 4,

            "Ransomware": 5

        }

        category = incident["category"]

        recovery = complexity.get(category, 2)

        # ----------------------------------------
        # Criticality Multiplier
        # ----------------------------------------

        criticality_factor = {

            "Critical": 2.0,

            "High": 1.5,

            "Medium": 1.2,

            "Low": 1.0

        }.get(

            criticality,

            1.0

        )

        # ----------------------------------------
        # Downtime (REALISTIC)
        # ----------------------------------------

        base_hours = {

            "Reconnaissance": 1,

            "Credential Access": 3,

            "Privilege Escalation": 8,

            "Malware": 18,

            "Ransomware": 48

        }

        downtime = (

            base_hours.get(category, 2)

            *

            criticality_factor

            *

            (risk / 100)

        )

        downtime = round(downtime, 1)

        # ----------------------------------------
        # Financial Components
        # ----------------------------------------

        direct_cost = affected_servers * 0.08

        operational_cost = (

            hourly_cost

            * downtime

        ) / 10000000

        compliance_cost = (

            affected_users

            * 15

        ) / 10000000

        reputation_cost = operational_cost * 0.20

        total = round(

            direct_cost

            + operational_cost

            + compliance_cost

            + reputation_cost,

            2

        )

        # ----------------------------------------
        # Business Impact
        # ----------------------------------------

        if total >= 20:

            impact = "SEVERE"

        elif total >= 10:

            impact = "HIGH"

        elif total >= 3:

            impact = "MEDIUM"

        else:

            impact = "LOW"


        impact_score = min(
            100,
            int(risk * 0.6 + recovery * 8)
        )

        # ----------------------------------------
        # Return
        # ----------------------------------------

        return {

            "service": service,

            "business_unit": business_unit,

            "criticality": criticality,

            "affected_servers": affected_servers,

            "affected_users": affected_users,

            "enterprise_users": enterprise_users,

            "hourly_cost": f"₹{hourly_cost:,}/hour",

            "downtime": f"{downtime} Hours",

            #"direct_cost": f"₹{direct_cost:.2f} Crore",

            #"operational_cost": f"₹{operational_cost:.2f} Crore",

            #"compliance_cost": f"₹{compliance_cost:.2f} Crore",

            #"reputation_cost": f"₹{reputation_cost:.2f} Crore",

            #"estimated_loss": f"₹{total:.2f} Crore",

            "direct_cost": self.format_money(direct_cost),
            "direct_cost_value": direct_cost,

            "operational_cost": self.format_money(operational_cost),
            "operational_cost_value": operational_cost,

            "compliance_cost": self.format_money(compliance_cost),
            "compliance_cost_value": compliance_cost,

            "reputation_cost": self.format_money(reputation_cost),
            "reputation_cost_value": reputation_cost,

            "estimated_loss": self.format_money(total),
            "estimated_loss_value": total,

            "operational_impact": impact,

            "impact_score": impact_score,

            "explanation": [

                f"Enterprise Risk Score : {risk}/100",

                f"Business Unit : {business_unit}",

                f"Recovery Complexity : {recovery}/5",

                f"Criticality : {criticality}",

                f"Predicted Downtime : {downtime} Hours",

                "Financial estimate combines recovery, operational disruption, compliance exposure, and reputation impact."

            ]

        }
    
    def vote(self, impact):

        return {

            "agent": "Business",

            "recommendation":

                impact["operational_impact"],

            "confidence":

                impact["impact_score"],

            "weight": 0.05,

            "reason": [

                f"Estimated loss {impact['estimated_loss']}",

                f"Downtime {impact['downtime']}"

            ],

            "evidence": {

                "business_unit":

                    impact["business_unit"],

                "criticality":

                    impact["criticality"]

            },

            "timestamp":

                impact["generated_at"]

        }