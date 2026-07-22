from ai.threats.threat_rules import ThreatRules


class RiskEngine:

    @staticmethod
    def evaluate(packet):

        event = packet["event"]

        rule = ThreatRules.lookup(
            event["event_type"]
        )

        if rule is None:

            return {

                "known_attack": False,

                "risk_score": 0,

                "category": "Normal",

                "priority": "LOW",

                "recommended_action":
                    "Continue monitoring."

            }
        #DEBUG
        print("RiskEngine received:", event["event_type"])

        return {

            "known_attack": True,

            "risk_score": rule["risk"],

            "category": rule["category"],

            "priority": rule["priority"],

            "recommended_action":
                rule["action"]

        }