class AttackChain:
    """
    Builds a dynamic attack chain based on
    the current incident category.
    """

    def build(self, packet):

        category = packet["oracle"]["category"]

        chain = []

        if category == "Reconnaissance":

            chain = [
                {"stage": "Reconnaissance", "completed": True}
            ]

        elif category == "Credential Access":

            chain = [
                {"stage": "Reconnaissance", "completed": True},
                {"stage": "Credential Access", "completed": True}
            ]

        elif category == "Privilege Escalation":

            chain = [
                {"stage": "Credential Access", "completed": True},
                {"stage": "Privilege Escalation", "completed": True}
            ]

        elif category == "Malware":

            chain = [
                {"stage": "Initial Access", "completed": True},
                {"stage": "Execution", "completed": True},
                {"stage": "Persistence", "completed": True},
                {"stage": "Malware", "completed": True}
            ]

        elif category == "Ransomware":

            chain = [
                {"stage": "Initial Access", "completed": True},
                {"stage": "Execution", "completed": True},
                {"stage": "Persistence", "completed": True},
                {"stage": "Privilege Escalation", "completed": True},
                {"stage": "Defense Evasion", "completed": True},
                {"stage": "Impact (Ransomware)", "completed": True}
            ]

        else:

            chain = [
                {"stage": category, "completed": True}
            ]

        return chain