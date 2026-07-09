class SecurityRisk:
    """
    Enterprise Security Risk Engine.
    """

    def calculate(self, behavior):

        score = behavior["behavior_score"]

        if score >= 80:
            priority = "P1"

        elif score >= 60:
            priority = "P2"

        elif score >= 30:
            priority = "P3"

        else:
            priority = "P4"

        return {

            "risk_score": score,

            "priority": priority

        }