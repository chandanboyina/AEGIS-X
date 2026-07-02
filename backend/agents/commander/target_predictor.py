import random


class TargetPredictor:
    """
    Predicts the next likely target.
    """

    targets = [

        "Finance Domain Controller",

        "Active Directory",

        "ERP Server",

        "Student Database",

        "VPN Gateway",

        "Mail Server",

        "Backup Server",

        "CBSE Examination Portal"

    ]

    def predict(self, incident):

        category = incident["category"]

        if category == "Credential Access":

            return "Active Directory"

        elif category == "Privilege Escalation":

            return "Domain Controller"

        elif category == "Malware":

            return "Finance Server"

        elif category == "Ransomware":

            return "Backup Server"

        return random.choice(self.targets)