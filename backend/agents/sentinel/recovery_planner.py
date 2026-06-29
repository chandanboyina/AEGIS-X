class RecoveryPlanner:
    """
    Builds recovery plans after containment.
    """

    def recover(self, category):

        recovery = []

        if category == "Reconnaissance":

            recovery = [
                "Review firewall logs",
                "Verify no additional reconnaissance occurred",
            ]

        elif category == "Credential Access":

            recovery = [
                "Reset compromised credentials",
                "Force password change",
                "Verify MFA enrollment",
                "Review account activity",
            ]

        elif category == "Privilege Escalation":

            recovery = [
                "Audit privileged accounts",
                "Review administrator actions",
                "Revoke unnecessary privileges",
            ]

        elif category == "Malware":

            recovery = [
                "Reimage infected endpoint",
                "Run full antivirus scan",
                "Validate system integrity",
            ]

        elif category == "Ransomware":

            recovery = [
                "Restore systems from clean backups",
                "Validate restored data",
                "Monitor for reinfection",
            ]

        else:

            recovery = [
                "Continue routine monitoring",
            ]

        return recovery