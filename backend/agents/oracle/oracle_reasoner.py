from datetime import datetime
import random
from agents.intelligence.mitre_attack import MITRE_ATTACK

class OracleReasoner:
    """
    Oracle AI reasoning engine.

    Performs enterprise-level threat
    investigation and attribution.
    """

    def reason(self, packet):

        

        #
        # Enterprise Intelligence
        #

        enterprise = packet.get(

            "enterprise_intelligence",

            {}

        )

        observer = packet["observer"]

        asset = packet["asset"]

        event = packet["event"]

        category = observer.get(

            "threat_category",

            "Normal"

        )

        requires_investigation = observer.get(

            "requires_investigation",

            False

        )

        

        campaign = enterprise.get(

            "campaign",

            {}

        )

        business = enterprise.get(

            "business",

            {}

        )

        enterprise_risk = enterprise.get(

            "enterprise",

            {}

        )

        mitre = MITRE_ATTACK.get(

            event["event_type"],

            {

                "id": "Unknown",

                "technique": "Unknown",

                "tactic": "Unknown"

            }

        )
        # -------------------------------
        # Threat Level
        # -------------------------------

        if category == "Normal":

            if requires_investigation:

                threat_level = "MEDIUM"

                confidence = 85

                priority = "P3"

            else:

                threat_level = "LOW"

                confidence = random.randint(70, 85)

                priority = "P4"

        elif category == "Reconnaissance":

            threat_level = "MEDIUM"
            confidence = random.randint(80, 90)
            priority = "P3"


        elif category == "Credential Access":

            threat_level = "HIGH"
            confidence = random.randint(88, 96)
            priority = "P2"

        elif category in (
            "Privilege Escalation",
            "Malware",
            "Ransomware",
        ):

            threat_level = "CRITICAL"
            confidence = random.randint(94, 99)
            priority = "P1"

        else:

            threat_level = "UNKNOWN"
            confidence = 50
            priority = "P5"

        # -------------------------------
        # Recommended Response
        # -------------------------------

        actions = {

            "Reconnaissance":
                "Block scanning source and increase monitoring.",

            "Credential Access":
                "Reset credentials and enable MFA.",

            "Privilege Escalation":
                "Investigate privileged accounts immediately.",

            "Malware":
                "Isolate endpoint and begin malware analysis.",

            "Ransomware":
                "Disconnect affected host and initiate incident response.",

            "Normal":

                "Continue monitoring unless behavioral anomaly requires investigation."
        }

        recommendation = actions.get(
            category,
            "Continue investigation."
        )

        #
        # Enterprise Intelligence
        #

        overall_risk = enterprise.get("overall_risk")

        #
        # No enterprise intelligence available
        # (Standalone Oracle)
        #

        if not overall_risk:

            mapping = {

                "LOW": 25,

                "MEDIUM": 50,

                "HIGH": 80,

                "CRITICAL": 95

            }

            overall_risk = mapping.get(
                threat_level,
                30
            )

        priority = enterprise.get(
            "priority"
        )

        if not priority:

            if overall_risk >= 90:

                priority = "P1"

            elif overall_risk >= 75:

                priority = "P2"

            elif overall_risk >= 50:

                priority = "P3"

            else:

                priority = "P4"

        recommended_action = enterprise.get(
            "recommended_action"
        )

        if not recommended_action:

            recommended_action = recommendation

        campaign = enterprise.get(
            "campaign",
            {}
        )

        business = enterprise.get(
            "business",
            {}
        )

        enterprise_risk = enterprise.get(
            "enterprise",
            {}
        )

        reasoning = [

            f"Attack category identified as '{category}'.",

            f"Target asset: {asset['hostname']}.",

            f"Asset criticality: {asset['criticality']}.",

            f"Observed event: {event['event_type']}.",

            f"Threat level assessed as {threat_level}.",

            f"MITRE Technique ID: {mitre['id']}.",

            f"MITRE Technique: {mitre['technique']}.",

            f"MITRE Tactic: {mitre['tactic']}.",

            f"Enterprise Risk : {overall_risk}/100.",

            f"Enterprise Priority : {priority}.",

            f"Recommended Response : {recommended_action}."

        ]

        incident_id = (
            "INC-"
            + datetime.now().strftime("%Y%m%d")
            + "-"
            + str(random.randint(1000, 9999))
        )

        return {

            "incident_id": incident_id,

            "category": category,

            "requires_investigation": requires_investigation,

            "mitre": mitre,

            "threat_level": threat_level,

            "overall_risk": overall_risk,

            "priority": priority,

            "recommended_action": recommended_action,

            "campaign": campaign,

            "business": business,

            "enterprise": enterprise_risk,

            "reasoning": reasoning,

            

        }