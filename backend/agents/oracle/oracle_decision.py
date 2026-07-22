class OracleDecision:
    """
    Oracle AI Decision Engine.

    Converts Oracle reasoning into
    an enterprise investigation decision.
    """

    def decide(self, investigation):

        overall_risk = investigation.get(
            "overall_risk",
            0
        )

        priority = investigation.get(
            "priority",
            "P4"
        )

        recommended = investigation.get(
            "recommended_action",
            "Monitor"
        )

        category = investigation["category"]

        if category == "Normal":

            investigate = investigation.get(

                "requires_investigation",

                False

            )

            if investigate:

                return {

                    "priority": "P3",

                    "status": "OPEN",

                    "confidence": 85,

                    "recommendation":

                        "Behavioral anomaly detected. Escalate for investigation."

                }

            return {

                "priority": "P4",

                "status": "CLOSED",

                "confidence": 80,

                "recommendation":

                    "Continue monitoring."

            }

        elif category == "Reconnaissance":

            return {

                "priority": priority,

                "status": "OPEN" if overall_risk >= 50 else "CLOSED",

                "confidence": min(
                    95,
                    max(
                        50,
                        overall_risk
                    )
                ),

                "recommendation": recommended

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