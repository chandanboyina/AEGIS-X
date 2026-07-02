import random


class RiskForecast:
    """
    Predicts likely attacks
    over the next 24 hours.
    """

    def predict(self, incident, enterprise_score):

        category = incident["category"]

        risk = {

            "Credential Attack": 10,

            "Privilege Escalation": 10,

            "Lateral Movement": 10,

            "Ransomware": 10,

            "Data Exfiltration": 10,

            "Insider Threat": 10

        }

        category = incident["category"]

        risk = {

            "Credential Attack": 10,

            "Privilege Escalation": 10,

            "Lateral Movement": 10,

            "Ransomware": 10,

            "Data Exfiltration": 10,

            "Insider Threat": 10

        }

        # -----------------------------------
        # Enterprise Driven Forecast
        # -----------------------------------

        if category == "Reconnaissance":

            risk["Credential Attack"] = min(
                enterprise_score + random.randint(-8, 5),
                95
            )

            risk["Privilege Escalation"] = max(
                risk["Credential Attack"] - random.randint(20, 30),
                5
            )

            risk["Lateral Movement"] = max(
                risk["Privilege Escalation"] - random.randint(10, 20),
                5
            )

        elif category == "Credential Access":

            risk["Credential Attack"] = min(
                enterprise_score + random.randint(5, 10),
                98
            )

            risk["Privilege Escalation"] = max(
                risk["Credential Attack"] - random.randint(10, 20),
                25
            )

            risk["Lateral Movement"] = max(
                risk["Privilege Escalation"] - random.randint(5, 15),
                20
            )

        elif category == "Privilege Escalation":

            risk["Privilege Escalation"] = min(
                enterprise_score + random.randint(5, 10),
                98
            )

            risk["Lateral Movement"] = max(
                risk["Privilege Escalation"] - random.randint(5, 15),
                45
            )

            risk["Ransomware"] = max(
                risk["Lateral Movement"] - random.randint(10, 20),
                20
            )

        elif category == "Malware":

            risk["Ransomware"] = min(
                enterprise_score + random.randint(5, 12),
                98
            )

            risk["Data Exfiltration"] = max(
                risk["Ransomware"] - random.randint(10, 20),
                35
            )

        elif category == "Ransomware":

            risk["Ransomware"] = min(
                enterprise_score + random.randint(8, 15),
                99
            )

            risk["Data Exfiltration"] = max(
                risk["Ransomware"] - random.randint(10, 20),
                60
            )

        # -----------------------------------
        # Add Natural Variation
        # -----------------------------------

        for attack in risk:

            risk[attack] += random.randint(0, 5)

            risk[attack] = min(risk[attack], 99)

        for attack in risk:

            risk[attack] += random.randint(0, 10)

            if risk[attack] > 99:

                risk[attack] = 99

        return risk