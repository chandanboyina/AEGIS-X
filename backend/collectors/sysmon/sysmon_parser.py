SYSMON_EVENTS = {

    1: {

        "event_name": "Process Creation",

        "category": "Execution",

        "risk_score": 70,

        "confidence": 85,

        "mitre": {

            "technique": "T1059",

            "tactic": "Execution"

        }

    },

    3: {

        "event_name": "Network Connection",

        "category": "Command and Control",

        "risk_score": 75,

        "confidence": 85,

        "mitre": {

            "technique": "T1071",

            "tactic": "Command and Control"

        }

    },

    7: {

        "event_name": "Image Loaded",

        "category": "Defense Evasion",

        "risk_score": 70,

        "confidence": 80,

        "mitre": {

            "technique": "T1574",

            "tactic": "Defense Evasion"

        }

    },

    11: {

        "event_name": "File Created",

        "category": "Persistence",

        "risk_score": 65,

        "confidence": 80,

        "mitre": {

            "technique": "T1547",

            "tactic": "Persistence"

        }

    },

    13: {

        "event_name": "Registry Value Set",

        "category": "Defense Evasion",

        "risk_score": 80,

        "confidence": 90,

        "mitre": {

            "technique": "T1112",

            "tactic": "Defense Evasion"

        }

    },

    22: {

        "event_name": "DNS Query",

        "category": "Discovery",

        "risk_score": 60,

        "confidence": 75,

        "mitre": {

            "technique": "T1046",

            "tactic": "Discovery"

        }

    }

}


class SysmonParser:
    """
    Enterprise Sysmon Parser.

    Converts Sysmon event IDs into
    enterprise security events.
    """

    def parse(
        self,
        log
    ):

        info = SYSMON_EVENTS.get(

            log["event_id"],

            {

                "event_name": log["event"],

                "category": "Unknown",

                "risk_score": 30,

                "confidence": 30,

                "mitre": {

                    "technique": "Unknown",

                    "tactic": "Unknown"

                }

            }

        )

        return {

            "timestamp":

                log["timestamp"],

            "collector":

                "Sysmon",

            "source":

                "Sysmon",

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

                log["severity"],

            "risk_score":

                info["risk_score"],

            "confidence":

                info["confidence"],

            "mitre":

                info["mitre"],

            "raw":

                log

        }