from collectors.security.security_events import SECURITY_EVENTS
from collectors.security.security_features import SecurityFeatures
from collectors.security.security_health import SecurityHealth
from collectors.security.security_risk import SecurityRisk
from collectors.security.security_threat import SecurityThreat


class SecurityParser:
    """
    Enterprise Windows Security Parser.

    Converts raw Windows Security logs into
    enterprise security intelligence.
    """

    def __init__(self):

        self.features = SecurityFeatures()
        self.health = SecurityHealth()
        self.risk = SecurityRisk()
        self.threat = SecurityThreat()

    def parse(self, log):

        #
        # Lookup Event
        #

        info = SECURITY_EVENTS.get(

            log["event_id"],

            {

                "event_name": log["event"],

                "category": "Unknown",

                "severity": log["severity"],

                "risk_score": 30,

                "confidence": 30,

                "mitre": {

                    "technique": "Unknown",

                    "tactic": "Unknown"

                }

            }

        )

        #
        # Feature Extraction
        #

        features = self.features.extract(log)

        #
        # Behavior Analysis
        #

        behavior = self.health.evaluate(features)

        #
        # Risk
        #

        risk = self.risk.calculate(behavior)

        #
        # Threat Classification
        #

        threat = self.threat.classify(features)

        #
        # Enterprise Output
        #

        return {

            "timestamp":

                log["timestamp"],

            "collector":

                "Windows Security",

            "source":

                log["source"],

            "asset":

                log["asset"],

            "hostname":

                log["computer"],

            "user":

                log.get("user"),

            "source_ip":

                log.get("source_ip"),

            "destination_ip":

                log.get("destination_ip"),

            "event":

                info["event_name"],

            "event_name":

                info["event_name"],

            "event_id":

                log["event_id"],

            "category":

                info["category"],

            "severity":

                info["severity"],

            "risk_score":

                info["risk_score"],

            "confidence":

                info["confidence"],

            #
            # Enterprise Security
            #

            "security": {

                "username":

                    features["username"],

                "remote_logon":

                    features["remote_logon"],

                "admin":

                    features["admin_account"],

                "system":

                    features["system_account"]

            },

            "security_features":

                features,

            "security_behavior":

                behavior,

            "security_risk":

                risk,

            "security_threat":

                threat,

            "mitre":

                info["mitre"],

            "raw":

                log

        }