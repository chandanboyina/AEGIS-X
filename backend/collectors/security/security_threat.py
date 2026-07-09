class SecurityThreat:
    """
    Enterprise Windows Security Threat Engine.
    """

    def classify(self, features):

        #
        # Privilege Escalation
        #

        if features["admin_group_change"]:

            return {

                "attack": "Privilege Escalation",

                "mitre": "T1098",

                "severity": "Critical",

                "confidence": 98

            }

        #
        # Persistence
        #

        if features["new_user"]:

            return {

                "attack": "Persistence",

                "mitre": "T1136",

                "severity": "High",

                "confidence": 95

            }

        #
        # Credential Access
        #

        if features["failed_logon"]:

            return {

                "attack": "Credential Access",

                "mitre": "T1110",

                "severity": "Medium",

                "confidence": 90

            }

        #
        # Execution
        #

        if features["process_creation"]:

            return {

                "attack": "Execution",

                "mitre": "T1059",

                "severity": "Medium",

                "confidence": 85

            }

        #
        # Default
        #

        return {

            "attack": "Benign",

            "mitre": None,

            "severity": "Low",

            "confidence": 100

        }