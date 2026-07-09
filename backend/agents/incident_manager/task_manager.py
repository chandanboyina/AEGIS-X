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

            ],

            "Execution": [

                ("Collect PowerShell logs", "COMPLETED"),
                ("Review executed commands", "IN PROGRESS"),
                ("Analyze parent process", "IN PROGRESS"),
                ("Verify script integrity", "PENDING"),
                ("Close incident", "PENDING")

            ],

            "Persistence": [

                ("Search startup entries", "COMPLETED"),
                ("Inspect scheduled tasks", "IN PROGRESS"),
                ("Review registry autoruns", "PENDING"),
                ("Remove persistence", "PENDING"),
                ("Close incident", "PENDING")

            ],

            "Defense Evasion": [

                ("Review security bypass attempts", "COMPLETED"),
                ("Check AMSI logs", "IN PROGRESS"),
                ("Validate Defender status", "PENDING"),
                ("Restore security controls", "PENDING"),
                ("Close incident", "PENDING")

            ],

            "Discovery": [

                ("Review enumeration activity", "COMPLETED"),
                ("Analyze discovery commands", "IN PROGRESS"),
                ("Determine exposed assets", "PENDING"),
                ("Close incident", "PENDING")

            ],

            "Lateral Movement": [

                ("Review remote connections", "COMPLETED"),
                ("Inspect authentication logs", "IN PROGRESS"),
                ("Identify affected hosts", "PENDING"),
                ("Close incident", "PENDING")

            ],

            "Command and Control": [

                ("Review DNS activity", "COMPLETED"),
                ("Analyze outbound traffic", "IN PROGRESS"),
                ("Block malicious domains", "PENDING"),
                ("Close incident", "PENDING")

            ],

            "Exfiltration": [

                ("Review outbound transfers", "COMPLETED"),
                ("Estimate data exposure", "IN PROGRESS"),
                ("Block exfiltration channel", "PENDING"),
                ("Close incident", "PENDING")

            ],

            "Impact": [

                ("Assess business impact", "COMPLETED"),
                ("Restore affected systems", "IN PROGRESS"),
                ("Validate recovery", "PENDING"),
                ("Close incident", "PENDING")

            ]

        }

        priority_map = {

            "COMPLETED": "HIGH",

            "IN PROGRESS": "MEDIUM",

            "PENDING": "LOW"

        }

        result = []

        default_tasks = [

            ("Initial investigation", "COMPLETED"),

            ("Collect evidence", "IN PROGRESS"),

            ("Determine root cause", "PENDING"),

            ("Close incident", "PENDING")

        ]

        for task, status in tasks.get(category, default_tasks):

            result.append({

                "task": task,

                "owner": owner,

                "priority": priority_map[status],

                "status": status

            })

        return result