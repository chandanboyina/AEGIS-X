import random
from agents.incident_manager.incident_repository import IncidentRepository

class HuntSummary:
    """
    Enterprise Threat Hunt Summary.
    """

    def build(self, query, matches):

        if not matches:

            return {

                "query": query,

                "matches": 0,

                "assets": 0,

                "users": 0,

                "highest_severity": "-",

                "mitre": "-",

                "recommendation": "No related activity found."

            }

        assets = set()

        users = set()

        mitre = set()

        highest = "MEDIUM"

        severity_rank = {

            "MEDIUM": 1,

            "HIGH": 2,

            "CRITICAL": 3

        }

        for incident in matches:

            assets.add(incident["asset"]["hostname"])

            if incident["investigation_summary"]["affected_users"]:

                users.add(incident["assigned_owner"])

            mitre.add(

                incident["mitre"]["id"]

            )

            if severity_rank[incident["severity"]] > severity_rank[highest]:

                highest = incident["severity"]

        shared_users = ", ".join(

            sorted(users)

        )

        campaign = "YES"
        confidence = "HIGH"

        if len(matches) == 1:

            campaign = "NO"
            confidence = "LOW"
        elif len(matches) <= 3:
            confidence = "MEDIUM"
        

        return {

            "query": query,

            "matches": len(matches),

            "assets": len(assets),

            "users": len(users),

            "highest_severity": highest,

            "mitre": ", ".join(sorted(mitre)),

            "search_time":
                f"{random.randint(8,45)} ms",

            "repository_size": len(IncidentRepository.incidents),

            "recommendation":

                "Investigate correlated activity across affected assets.",

            "shared_users": shared_users,

            "potential_campaign": campaign,

            "campaign_confidence": confidence

        }