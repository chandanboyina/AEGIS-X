from collectors.powershell.powershell_health import PowerShellHealth
from collectors.powershell.powershell_risk import PowerShellRisk
from collectors.powershell.powershell_features import PowerShellFeatures
from collectors.powershell.powershell_threat import PowerShellThreat

POWERSHELL_EVENTS = {

    4100: {

        "event_name": "PowerShell Engine Error",

        "category": "Execution",

        "severity": "Medium",

        "risk_score": 40,

        "confidence": 80,

        "mitre": {

            "technique": "T1059.001",

            "tactic": "Execution"

        }

    },

    4103: {

        "event_name": "Module Logging",

        "category": "Execution",

        "severity": "Low",

        "risk_score": 25,

        "confidence": 75,

        "mitre": {

            "technique": "T1059.001",

            "tactic": "Execution"

        }

    },

    4104: {

        "event_name": "Script Block Logging",

        "category": "Execution",

        "severity": "High",

        "risk_score": 70,

        "confidence": 95,

        "mitre": {

            "technique": "T1059.001",

            "tactic": "Execution"

        }

    },

    40961: {

        "event_name": "PowerShell Engine Start",

        "category": "Execution",

        "severity": "Info",

        "risk_score": 10,

        "confidence": 70,

        "mitre": {

            "technique": "T1059.001",

            "tactic": "Execution"

        }

    },

    40962: {

        "event_name": "PowerShell Engine Stop",

        "category": "Execution",

        "severity": "Info",

        "risk_score": 10,

        "confidence": 70,

        "mitre": {

            "technique": "T1059.001",

            "tactic": "Execution"

        }

    },

    53504: {

        "event_name": "PowerShell Provider Lifecycle",

        "category": "Execution",

        "severity": "Info",

        "risk_score": 10,

        "confidence": 60,

        "mitre": {

            "technique": "T1059.001",

            "tactic": "Execution"

        }

    }

}


class PowerShellParser:

    def __init__(self):

        self.features = PowerShellFeatures()

        self.health = PowerShellHealth()

        self.risk = PowerShellRisk()

        self.threat = PowerShellThreat()

    def parse(

        self,

        log

    ):

        info = POWERSHELL_EVENTS.get(

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

        event_data = log.get(

            "event_data",

            {}

        )

        context = event_data.get(

            "ContextInfo",

            ""

        )

        payload = event_data.get(

            "Payload",

            ""

        )

        powershell = {

            "context":
                context,

            "payload":
                payload

        }

        features = self.features.extract(

            powershell

        )

        behavior = self.health.evaluate(

            features

        )

        #behavior["features"] = features

        risk = self.risk.calculate(

            behavior

        )

        threat = self.threat.classify(

            features

        )

        return {

            "timestamp":

                log["timestamp"],

            "collector":

                "PowerShell",

            "source":

                log["source"],

            "asset":

                log["asset"],

            "hostname":

                log.get(

                    "computer",

                    log["asset"]

                ),

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

            "powershell":

                powershell,

            "powershell_features":

                features,

            "powershell_behavior":

                behavior,

            "powershell_risk":

                risk,

            "powershell_threat":

                threat,

            "mitre":

                info["mitre"],

            "raw":

                log

        }