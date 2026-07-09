class CampaignRisk:
    """
    Enterprise Campaign Risk Engine.

    Estimates how dangerous an
    attack campaign currently is.
    """

    def evaluate(
        self,
        campaign
    ):

        attack = campaign["attack"]

        confidence = campaign["confidence"]

        events = campaign["event_count"]

        #
        # Base risk by attack type
        #

        base = {

            "Credential Attack":55,

            "Execution":65,

            "Lateral Movement":80,

            "Privilege Escalation":90,

            "Persistence":75,

            "Ransomware":100,

            "Unknown Activity":30

        }

        risk = base.get(

            attack,

            40

        )

        #
        # Confidence bonus
        #

        risk += confidence * 0.15

        #
        # More events → more confidence
        #

        risk += events * 2

        risk = round(

            min(

                risk,

                100

            )

        )

        #
        # Severity
        #

        if risk >= 90:

            severity = "Critical"

            priority = "P1"

        elif risk >= 75:

            severity = "High"

            priority = "P2"

        elif risk >= 50:

            severity = "Medium"

            priority = "P3"

        else:

            severity = "Low"

            priority = "P4"

        #
        # Predict next stage
        #

        next_stage = {

            "Credential Attack":

                "Execution",

            "Execution":

                "Lateral Movement",

            "Lateral Movement":

                "Privilege Escalation",

            "Privilege Escalation":

                "Persistence",

            "Persistence":

                "Impact",

            "Ransomware":

                "Encryption"

        }.get(

            attack,

            "Unknown"

        )

        return {

            "risk":

                risk,

            "severity":

                severity,

            "priority":

                priority,

            "next_stage":

                next_stage

        }