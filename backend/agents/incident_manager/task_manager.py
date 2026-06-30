class TaskManager:
    """
    Creates analyst tasks based on incident category.
    """

    def build(self, packet, incident):

        category = packet["oracle"]["category"]

        owner = incident["assigned_owner"]

        tasks = {

            "Reconnaissance": [

                ("Validate Oracle findings", "COMPLETED"),

                ("Verify firewall block", "COMPLETED"),

                ("Review firewall logs", "IN PROGRESS"),

                ("Close investigation", "PENDING")

            ],

            "Credential Access": [

                ("Lock account", "COMPLETED"),

                ("Reset credentials", "COMPLETED"),

                ("Force password change", "IN PROGRESS"),

                ("Verify MFA enrollment", "PENDING"),

                ("Close incident", "PENDING")

            ],

            "Privilege Escalation": [

                ("Disable privileged account", "COMPLETED"),

                ("Review administrator activity", "COMPLETED"),

                ("Audit privileged accounts", "IN PROGRESS"),

                ("Validate privilege removal", "PENDING"),

                ("Close incident", "PENDING")

            ],

            "Malware": [

                ("Isolate endpoint", "COMPLETED"),

                ("Capture memory", "COMPLETED"),

                ("Perform malware analysis", "IN PROGRESS"),

                ("Validate endpoint rebuild", "PENDING"),

                ("Close incident", "PENDING")

            ],

            "Ransomware": [

                ("Isolate affected systems", "COMPLETED"),

                ("Restore backups", "COMPLETED"),

                ("Validate restored files", "IN PROGRESS"),

                ("Monitor reinfection", "PENDING"),

                ("Close incident", "PENDING")

            ]

        }

        priority_map = {

            "COMPLETED": "HIGH",

            "IN PROGRESS": "MEDIUM",

            "PENDING": "LOW"

        }

        result = []

        for task, status in tasks[category]:

            result.append({

                "task": task,

                "owner": owner,

                "priority": priority_map[status],

                "status": status

            })

        return result