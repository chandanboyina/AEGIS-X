from collectors.defender.defender_health import DefenderHealth
from collectors.defender.defender_risk import DefenderRisk

DEFENDER_EVENTS = {

    #
    # Malware Detection
    #

    1116: {

        "event_name": "Malware Detected",

        "category": "Malware",

        "severity": "HIGH",

        "risk_score": 90,

        "confidence": 95,

        "mitre": {

            "technique": "T1204",

            "tactic": "Execution"

        }

    },

    #
    # Malware Remediated
    #

    1117: {

        "event_name": "Threat Remediated",

        "category": "Recovery",

        "severity": "MEDIUM",

        "risk_score": 50,

        "confidence": 90,

        "mitre": {

            "technique": "Unknown",

            "tactic": "Recovery"

        }

    },

    #
    # Quarantine
    #

    1118: {

        "event_name": "Threat Quarantined",

        "category": "Containment",

        "severity": "MEDIUM",

        "risk_score": 45,

        "confidence": 90,

        "mitre": {

            "technique": "Unknown",

            "tactic": "Containment"

        }

    },

    #
    # Antivirus Scan
    #

    1000: {

        "event_name": "Scan Started",

        "category": "Scan",

        "severity": "INFO",

        "risk_score": 10,

        "confidence": 100,

        "mitre": {

            "technique": "Unknown",

            "tactic": "Defense"

        }

    },

    #
    # Scan Completed
    #

    1001: {

        "event_name": "Scan Completed",

        "category": "Scan",

        "severity": "INFO",

        "risk_score": 10,

        "confidence": 100,

        "mitre": {

            "technique": "Unknown",

            "tactic": "Defense"

        }

    }

}


class DefenderParser:
    """
    Enterprise Windows Defender Parser.
    """

    def __init__(self):

        self.health = DefenderHealth()

        self.risk = DefenderRisk()

    def parse(

        self,

        log

    ):

        info = DEFENDER_EVENTS.get(

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
        # Enterprise Defender Intelligence
        #

        event_data = log.get(

            "event_data",

            {}

        )

        #
        # Protection Status
        #

        rtp = event_data.get(

            "RTP state"

        )

        oa = event_data.get(

            "OA state"

        )

        scan_age = event_data.get(

            "Last quick scan age"

        )

        engine = event_data.get(

            "Engine version"

        )

        signature = event_data.get(

            "AV security intelligence version"

        )

        #
        # Build Defender Information
        #

        defender = {

            "engine":

                engine,

            "signature":

                signature,

            "real_time_protection":

                rtp,

            "on_access":

                oa,

            "last_scan_age":

                scan_age

        }

        #
        # Evaluate Endpoint Health
        #

        health = self.health.evaluate(

            defender

        )

        risk = self.risk.calculate(

            defender,

            health

        )

        return {

            "timestamp":

                log["timestamp"],

            "collector":

                "Windows Defender",

            "source":

                log["source"],

            "asset":

                log["asset"],

            "hostname":

                log["asset"],

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
       
            "defender":

                defender,

            "endpoint_health":

                health,

            "endpoint_risk":

                risk,

            "mitre":

                info["mitre"],

            "raw":

                log

        }