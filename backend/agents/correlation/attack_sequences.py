"""
Enterprise Attack Sequence Library.

Each attack describes the expected
behavioral progression.
"""

ATTACK_SEQUENCES = [

    {

        "name": "Credential Attack",

        "severity": "High",

        "sequence": [

            "Credential Access",

            "Execution"

        ]

    },

    {

        "name": "Lateral Movement",

        "severity": "Critical",

        "sequence": [

            "Credential Access",

            "Execution",

            "Lateral Movement"

        ]

    },

    {

        "name": "Privilege Escalation",

        "severity": "Critical",

        "sequence": [

            "Execution",

            "Privilege Escalation"

        ]

    },

    {

        "name": "Persistence",

        "severity": "High",

        "sequence": [

            "Execution",

            "Persistence"

        ]

    },

    {

        "name": "Ransomware",

        "severity": "Critical",

        "sequence": [

            "Credential Access",

            "Execution",

            "Lateral Movement",

            "Privilege Escalation",

            "Impact"

        ]

    }

]