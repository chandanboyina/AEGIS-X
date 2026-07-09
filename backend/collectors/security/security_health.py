class SecurityHealth:
    """
    Enterprise Windows Security Health Engine.
    """

    def evaluate(self, features):

        score = 0

        findings = []

        if features["failed_logon"]:
            score += 15
            findings.append("Failed Logon")

        if features["privileged_logon"]:
            score += 25
            findings.append("Privileged Logon")

        if features["admin_group_change"]:
            score += 40
            findings.append("Admin Group Modified")

        if features["service_install"]:
            score += 30
            findings.append("New Service Installed")

        if features["new_user"]:
            score += 25
            findings.append("User Created")

        if features["debug_privilege"]:
            score += 20
            findings.append("Debug Privilege")

        if features["backup_privilege"]:
            score += 10
            findings.append("Backup Privilege")

        if features["impersonation"]:
            score += 15
            findings.append("Impersonation Privilege")

        score = min(score, 100)

        if score >= 80:
            status = "Critical"

        elif score >= 50:
            status = "Warning"

        else:
            status = "Healthy"

        return {

            "behavior_score": score,

            "status": status,

            "findings": findings

        }