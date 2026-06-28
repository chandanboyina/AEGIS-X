class IncidentReport:
    """
    Generates an enterprise incident report
    from a correlated attack campaign.
    """

    def generate(self, campaign):

        attack_chain = campaign["attack_chain"]

        timeline = campaign["timeline"]

        # ------------------------------------
        # MITRE Summary
        # ------------------------------------

        mitre_summary = []

        for stage in attack_chain:

            mitre = stage["mitre"]

            item = {

                "id": mitre["id"],

                "technique": mitre["technique"],

                "tactic": mitre["tactic"],

            }

            if item not in mitre_summary:

                mitre_summary.append(item)

        # ------------------------------------
        # Executive Summary
        # ------------------------------------

        summary = (

            f"Oracle AI correlated "

            f"{campaign['event_count']} "

            f"event(s) into a "

            f"{campaign['category']} campaign "

            f"targeting "

            f"{campaign['asset']}."

        )

        # ------------------------------------
        # Risk Score
        # ------------------------------------

        highest_stage = max(

            stage["stage"]

            for stage in attack_chain

        )

        category = campaign["category"]

        if category == "Normal":

            risk_score = 0

        elif category == "Reconnaissance":

            risk_score = 25

        elif category == "Credential Access":

            risk_score = 55

        elif category == "Privilege Escalation":

            risk_score = 75

        elif category == "Malware":

            risk_score = 90

        elif category == "Ransomware":

            risk_score = 100

        else:

            risk_score = 50
        # ------------------------------------
        # Recommendations
        # ------------------------------------

        category = campaign["category"]

        recommendations = []

        if category == "Credential Access":

            recommendations.extend([

                "Reset affected credentials",

                "Enable MFA",

            ])

        elif category == "Reconnaissance":

            recommendations.extend([

                "Block scanning source",

                "Increase monitoring",

            ])

        elif category == "Privilege Escalation":

            recommendations.extend([

                "Review privileged accounts",

                "Audit administrator activity",

            ])

        elif category == "Malware":

            recommendations.extend([

                "Isolate affected endpoint",

                "Start malware investigation",

            ])

        elif category == "Ransomware":

            recommendations.extend([

                "Disconnect affected host",

                "Activate incident response",

                "Restore from clean backups",

            ])

        else:

            recommendations.append(

                "Continue monitoring."

            )

        return {

            "campaign_id":

                campaign["campaign_id"],

            "asset":

                campaign["asset"],

            "category":

                category,

            "events":

                campaign["event_count"],

            "risk_score":

                risk_score,

            "executive_summary":

                summary,

            "attack_chain":

                attack_chain,

            "timeline":

                timeline,

            "mitre_summary":

                mitre_summary,

            "recommendations":

                recommendations,

        }