class DefenderRisk:
    """
    Calculates endpoint security risk
    from Defender telemetry.
    """

    def calculate(

        self,

        defender,

        health

    ):

        risk = 0

        #
        # Real-time protection
        #

        if defender.get(

            "real_time_protection"

        ) != "Enabled":

            risk += 40

        #
        # On-access protection
        #

        if defender.get(

            "on_access"

        ) != "Enabled":

            risk += 25

        #
        # Scan age
        #

        try:

            age = int(

                defender.get(

                    "last_scan_age",

                    999

                )

            )

            if age > 7:

                risk += 15

        except Exception:

            risk += 10

        #
        # Health contribution
        #

        risk += max(

            0,

            100 - health["health_score"]

        )

        return {

            "risk_score":

                min(risk,100),

            "priority":

                self.priority(risk)

        }

    def priority(

        self,

        score

    ):

        if score >= 90:

            return "P1"

        if score >= 70:

            return "P2"

        if score >= 40:

            return "P3"

        return "P4"