class ThreatRules:
    """
    Enterprise threat knowledge base.

    Maps attack techniques to
    risk levels and recommendations.
    """

    RULES = {

        # --------------------------
        # Reconnaissance
        # --------------------------

        "Port Scan": {
            "category": "Reconnaissance",
            "risk": 20,
            "priority": "MEDIUM",
            "action": "Investigate scanning activity."
        },

        "DNS Enumeration": {
            "category": "Reconnaissance",
            "risk": 20,
            "priority": "MEDIUM",
            "action": "Investigate DNS reconnaissance."
        },

        "Network Probe": {
            "category": "Reconnaissance",
            "risk": 25,
            "priority": "MEDIUM",
            "action": "Investigate network discovery."
        },

        "SMB Enumeration": {
            "category": "Reconnaissance",
            "risk": 25,
            "priority": "MEDIUM",
            "action": "Investigate SMB enumeration."
        },

        # --------------------------
        # Credential Access
        # --------------------------

        "Failed Login": {
            "category": "Credential Access",
            "risk": 30,
            "priority": "HIGH",
            "action": "Investigate authentication failures."
        },

        "Brute Force Attack": {
            "category": "Credential Access",
            "risk": 40,
            "priority": "HIGH",
            "action": "Possible brute force attack."
        },

        "Password Spray": {
            "category": "Credential Access",
            "risk": 45,
            "priority": "HIGH",
            "action": "Possible password spraying."
        },

        "Privilege Escalation": {
            "category": "Privilege Escalation",
            "risk": 60,
            "priority": "CRITICAL",
            "action": "Immediate investigation required."
        },

        # --------------------------
        # Malware
        # --------------------------

        "Malware Detection": {
            "category": "Malware",
            "risk": 60,
            "priority": "CRITICAL",
            "action": "Isolate endpoint immediately."
        },

        "Suspicious PowerShell": {
            "category": "Malware",
            "risk": 55,
            "priority": "CRITICAL",
            "action": "Inspect PowerShell execution."
        },

        "Registry Modification": {
            "category": "Malware",
            "risk": 50,
            "priority": "HIGH",
            "action": "Inspect registry changes."
        },

        "Command and Control": {
            "category": "Malware",
            "risk": 80,
            "priority": "CRITICAL",
            "action": "Possible active compromise."
        },

        # --------------------------
        # Ransomware
        # --------------------------

        "Mass File Encryption": {
            "category": "Ransomware",
            "risk": 90,
            "priority": "CRITICAL",
            "action": "Immediate containment required."
        },

        "Backup Deletion": {
            "category": "Ransomware",
            "risk": 90,
            "priority": "CRITICAL",
            "action": "Protect backup infrastructure."
        },

        "Data Exfiltration": {
            "category": "Ransomware",
            "risk": 100,
            "priority": "CRITICAL",
            "action": "Immediate incident response."
        },

        "Shadow Copy Deletion": {
            "category": "Ransomware",
            "risk": 85,
            "priority": "CRITICAL",
            "action": "Possible ransomware preparation."
        }

    }

    @classmethod
    def lookup(cls, event_type):

        return cls.RULES.get(
            event_type,
            None
        )