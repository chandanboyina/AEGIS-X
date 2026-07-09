class DNSThreat:
    """
    Enterprise DNS Threat Classification.
    """

    def classify(self, features):

        if features["possible_dga"]:

            return {

                "attack": "Domain Generation Algorithm",

                "mitre": "T1568",

                "severity": "High",

                "confidence": 90

            }

        if features["suspicious_tld"]:

            return {

                "attack": "Suspicious Domain",

                "mitre": "T1071.004",

                "severity": "Medium",

                "confidence": 80

            }

        if features["many_subdomains"]:

            return {

                "attack": "Possible DNS Tunneling",

                "mitre": "T1071.004",

                "severity": "High",

                "confidence": 85

            }

        return {

            "attack": "Benign",

            "mitre": None,

            "severity": "Low",

            "confidence": 100

        }