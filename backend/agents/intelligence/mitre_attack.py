"""
MITRE ATT&CK Intelligence Database

Maps enterprise security events to
MITRE ATT&CK techniques.
"""

MITRE_ATTACK = {

    # ============================
    # Reconnaissance
    # ============================

    "Port Scan": {
        "id": "T1595",
        "technique": "Active Scanning",
        "tactic": "Reconnaissance",
    },

    "DNS Enumeration": {
        "id": "T1590",
        "technique": "Gather Victim Network Information",
        "tactic": "Reconnaissance",
    },

    "Network Probe": {
        "id": "T1595",
        "technique": "Active Scanning",
        "tactic": "Reconnaissance",
    },

    "SMB Enumeration": {
        "id": "T1135",
        "technique": "Network Share Discovery",
        "tactic": "Discovery",
    },

    # ============================
    # Credential Access
    # ============================

    "Failed Login": {
        "id": "T1110",
        "technique": "Brute Force",
        "tactic": "Credential Access",
    },

    "Brute Force Attack": {
        "id": "T1110",
        "technique": "Brute Force",
        "tactic": "Credential Access",
    },

    "Password Spray": {
        "id": "T1110.003",
        "technique": "Password Spraying",
        "tactic": "Credential Access",
    },

    # ============================
    # Privilege Escalation
    # ============================

    "Privilege Escalation": {
        "id": "T1068",
        "technique": "Exploitation for Privilege Escalation",
        "tactic": "Privilege Escalation",
    },

    # ============================
    # Malware
    # ============================

    "Malware Detection": {
        "id": "T1204",
        "technique": "User Execution",
        "tactic": "Execution",
    },

    "Suspicious PowerShell": {
        "id": "T1059.001",
        "technique": "PowerShell",
        "tactic": "Execution",
    },

    "Registry Modification": {
        "id": "T1112",
        "technique": "Modify Registry",
        "tactic": "Defense Evasion",
    },

    "Command and Control": {
        "id": "T1071",
        "technique": "Application Layer Protocol",
        "tactic": "Command and Control",
    },

    # ============================
    # Ransomware
    # ============================

    "Mass File Encryption": {
        "id": "T1486",
        "technique": "Data Encrypted for Impact",
        "tactic": "Impact",
    },

    "Backup Deletion": {
        "id": "T1490",
        "technique": "Inhibit System Recovery",
        "tactic": "Impact",
    },

    "Shadow Copy Deletion": {
        "id": "T1490",
        "technique": "Inhibit System Recovery",
        "tactic": "Impact",
    },

    "Data Exfiltration": {
        "id": "T1041",
        "technique": "Exfiltration Over C2 Channel",
        "tactic": "Exfiltration",
    },

}