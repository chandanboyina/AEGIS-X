'''
class InvestigationSummary:

    def build(self, packet):

        category = packet["oracle"]["category"]

        priority = packet["sentinel"]["priority"]

        risk_scores = {
            "MEDIUM": 60,
            "HIGH": 82,
            "CRITICAL": 96
        }

        mitre_stage = {

            "Reconnaissance": "Reconnaissance",

            "Credential Access": "Credential Access",

            "Privilege Escalation": "Privilege Escalation",

            "Malware": "Execution",

            "Ransomware": "Impact"

        }

        event = packet["event"]

        # -----------------------------
        # IOC Count
        # -----------------------------
        ioc_count = 2  # Source IP + Asset

        if "ports" in event:
            ioc_count += len(event["ports"])

        if "process" in event:
            ioc_count += 1

        if "username" in event:
            ioc_count += 1

        # -----------------------------
        # IOC Types
        # -----------------------------
        ioc_types = []

        for ioc in incident["ioc_list"]:

            if ioc["type"] not in ioc_types:

                ioc_types.append(
                    ioc["type"]
                )

        if "ports" in event:
            ioc_types.append("Ports")

        if "process" in event:
            ioc_types.append("Process")

        if "username" in event:
            ioc_types.append("Username")

        return {

            "risk_score": risk_scores[priority],

            "confidence": "High",

            "mitre_stage": mitre_stage[category],

            "affected_users": 1 if "username" in event else 0,

            "affected_assets": 1,

            "ioc_count": ioc_count,

            "ioc_types": ioc_types

        }

'''

class InvestigationSummary:

    def build(self, incident):

        category = incident["category"]

        priority = incident["severity"]

        risk_scores = {
            "MEDIUM": 60,
            "HIGH": 82,
            "CRITICAL": 96
        }

        mitre_stage = {

            "Reconnaissance": "Reconnaissance",

            "Credential Access": "Credential Access",

            "Privilege Escalation": "Privilege Escalation",

            "Malware": "Execution",

            "Ransomware": "Impact"

        }

        # -----------------------------
        # IOC Count
        # -----------------------------
        ioc_count = len(
            incident["ioc_list"]
        )

        # -----------------------------
        # IOC Types
        # -----------------------------
        ioc_types = []

        for ioc in incident["ioc_list"]:

            if ioc["type"] not in ioc_types:

                ioc_types.append(
                    ioc["type"]
                )

        return {

            "risk_score":
                risk_scores[priority],

            "confidence":
                "High",

            "mitre_stage":
                mitre_stage[category],

            "affected_users":
                1,

            "affected_assets":
                1,

            "ioc_count":
                ioc_count,

            "ioc_types":
                ioc_types

        }