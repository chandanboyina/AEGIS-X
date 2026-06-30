import random


class IncidentAssignment:
    """
    Assigns incidents to SOC teams
    and analysts.
    """

    TIER1 = [

        "Amit Sharma",

        "Priya Reddy",

        "Rahul Kumar"

    ]

    TIER2 = [

        "Neha Patel",

        "Arjun Singh",

        "Karthik Rao"

    ]

    TIER3 = [

        "SOC IR Team",

        "Digital Forensics Team",

        "Malware Response Team"

    ]

    def assign(self, priority):

        if priority == "CRITICAL":

            return {

                "team": "Tier-3 Incident Response",

                "owner": random.choice(self.TIER3)

            }

        elif priority == "HIGH":

            return {

                "team": "Tier-2 SOC",

                "owner": random.choice(self.TIER2)

            }

        elif priority == "MEDIUM":

            return {

                "team": "Tier-1 SOC",

                "owner": random.choice(self.TIER1)

            }

        return {

            "team": "Monitoring Team",

            "owner": "Automated Monitoring"

        }