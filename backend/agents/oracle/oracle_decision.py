class OracleDecision:
    """
    Oracle AI Decision Engine.

    Converts Oracle reasoning into
    an enterprise investigation decision.
    """

    def decide(self, investigation):

        category = investigation["category"]

        if category == "Normal":

            return {

                "priority": "P4",

                "status": "CLOSED",

                "confidence": 80,

                "recommendation":
                    "Continue monitoring."

            }

        elif category == "Reconnaissance":

            return {

                "priority": "P3",

                "status": "OPEN",

                "confidence": 85,

                "recommendation":
                    "Block scanning source and increase monitoring."

            }

        elif category == "Credential Access":

            return {

                "priority": "P2",

                "status": "OPEN",

                "confidence": 92,

                "recommendation":
                    "Reset credentials and enable MFA."

            }

        elif category == "Privilege Escalation":

            return {

                "priority": "P1",

                "status": "OPEN",

                "confidence": 97,

                "recommendation":
                    "Investigate privileged accounts immediately."

            }

        elif category == "Malware":

            return {

                "priority": "P1",

                "status": "OPEN",

                "confidence": 98,

                "recommendation":
                    "Isolate endpoint immediately."

            }

        elif category == "Ransomware":

            return {

                "priority": "P1",

                "status": "OPEN",

                "confidence": 99,

                "recommendation":
                    "Disconnect affected host and activate incident response."

            }

        return {

            "priority": "P5",

            "status": "UNKNOWN",

            "confidence": 50,

            "recommendation":
                "Manual investigation required."

        }