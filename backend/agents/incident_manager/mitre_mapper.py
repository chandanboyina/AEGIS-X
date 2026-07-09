class MitreMapper:
    """
    Maps Oracle detections to
    MITRE ATT&CK tactics and techniques.
    """

    def __init__(self):

        self.mapping = {

            "Reconnaissance": {

                "tactic": "Reconnaissance",

                "technique": "Active Scanning",

                "id": "T1595"

            },

            "Credential Access": {

                "tactic": "Credential Access",

                "technique": "Brute Force",

                "id": "T1110"

            },

            "Privilege Escalation": {

                "tactic": "Privilege Escalation",

                "technique": "Exploitation for Privilege Escalation",

                "id": "T1068"

            },

            "Malware": {

                "tactic": "Execution",

                "technique": "PowerShell",

                "id": "T1059.001"

            },

            "Ransomware": {

                "tactic": "Impact",

                "technique": "Data Encrypted for Impact",

                "id": "T1486"

            }

        }

    def map(self, packet):

        category = packet["oracle"]["category"]

        mitre = self.mapping.get(

            category,

            {

                "tactic":"Unknown",

                "technique":"Unknown",

                "id":"N/A"

            }

        )

        mitre["reasoning"]=[

            f"Tactic: {mitre['tactic']}.",

            f"Technique: {mitre['technique']}.",

            f"MITRE ID: {mitre['id']}."

        ]

        return mitre