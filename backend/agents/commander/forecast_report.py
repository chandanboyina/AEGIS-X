class ForecastReport:
    """
    Generates an explainable
    enterprise risk forecast.
    """

    def build(self, incident, forecast):

        reasons = []

        category = incident["category"]

        severity = incident["severity"]

        if severity == "CRITICAL":

            reasons.append(
                "Critical severity incident detected."
            )

        elif severity == "HIGH":

            reasons.append(
                "High severity incident detected."
            )

        mitre = incident["mitre"]

        reasons.append(

            f"MITRE Technique "

            f"{mitre['id']} "

            f"({mitre['technique']}) observed."

        )

        if len(incident["ioc_list"]) > 5:

            reasons.append(

                "Large number of IOCs extracted."

            )

        if category == "Credential Access":

            reasons.append(

                "Credential theft often precedes privilege escalation."

            )

        elif category == "Privilege Escalation":

            reasons.append(

                "Privilege escalation frequently leads to lateral movement."

            )

        elif category == "Malware":

            reasons.append(

                "Malware execution may evolve into ransomware."

            )

        elif category == "Ransomware":

            reasons.append(

                "Encryption activity indicates business disruption."

            )

        return {

            "forecast": forecast,

            "explanation": reasons

        }