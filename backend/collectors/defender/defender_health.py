class DefenderHealth:
    """
    Evaluates Windows Defender endpoint health.
    """

    def evaluate(self, defender):

        score = 100
        issues = []

        #
        # Real-Time Protection
        #

        if defender.get("real_time_protection") != "Enabled":

            score -= 40

            issues.append(
                "Real-time protection disabled."
            )

        #
        # On Access Protection
        #

        if defender.get("on_access") != "Enabled":

            score -= 25

            issues.append(
                "On-access protection disabled."
            )

        #
        # Last Quick Scan
        #

        try:

            age = int(
                defender.get(
                    "last_scan_age",
                    999
                )
            )

            if age > 7:

                score -= 15

                issues.append(
                    "Quick scan older than 7 days."
                )

        except Exception:

            score -= 10

            issues.append(
                "Unable to determine scan age."
            )

        #
        # Engine Version
        #

        if not defender.get("engine"):

            score -= 10

            issues.append(
                "Engine version unavailable."
            )

        #
        # Signature Version
        #

        if not defender.get("signature"):

            score -= 10

            issues.append(
                "Signature version unavailable."
            )

        #
        # Overall Status
        #

        if score >= 90:

            status = "Healthy"

        elif score >= 70:

            status = "Warning"

        else:

            status = "Critical"

        return {

            "health_score": score,

            "status": status,

            "issues": issues

        }