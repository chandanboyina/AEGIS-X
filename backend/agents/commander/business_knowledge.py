class BusinessKnowledge:
    """
    Business Knowledge Base.

    Represents estimated business values
    for different critical infrastructure services.

    These are configurable profiles and can later
    be loaded from CMDB or asset inventory.
    """

    profiles = {

        "WEB": {

            "service": "Citizen Web Portal",

            "criticality": "Medium",

            "hourly_cost": 250000,

            "mission": "Public Services"

        },

        "EMAIL": {

            "service": "Government Email",

            "criticality": "High",

            "hourly_cost": 800000,

            "mission": "Official Communication"

        },

        "FIN": {

            "service": "Finance System",

            "criticality": "Critical",

            "hourly_cost": 2500000,

            "mission": "Financial Operations"

        },

        "DB": {

            "service": "Student Records Database",

            "criticality": "Critical",

            "hourly_cost": 5000000,

            "mission": "Education Services"

        },

        "VPN": {

            "service": "Remote Access",

            "criticality": "High",

            "hourly_cost": 1200000,

            "mission": "Remote Workforce"

        },

        "FW": {

            "service": "Perimeter Security",

            "criticality": "Critical",

            "hourly_cost": 3000000,

            "mission": "Network Protection"

        }

    }

    def get_profile(self, hostname):

        for key in self.profiles:

            if key in hostname:

                return self.profiles[key]

        return {

            "service": "Unknown",

            "criticality": "Medium",

            "hourly_cost": 200000,

            "mission": "General"

        }