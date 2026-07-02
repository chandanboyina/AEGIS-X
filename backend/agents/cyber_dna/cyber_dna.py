class CyberDNA:

    """
    Creates an attack fingerprint
    for every incident.
    """

    def build(

        self,

        incident

    ):

        profile = incident.get(

            "asset_profile",

            {}

        )

        return {

            "category":

                incident.get("category"),

            "severity":

                incident.get("severity"),

            "mitre":

                incident["mitre"]["id"],

            "service":

                profile.get("service"),

            "business":

                profile.get(

                    "business_unit"

                ),

            "criticality":

                profile.get(

                    "criticality"

                ),

            "users":

                profile.get(

                    "enterprise_users",

                    0

                ),

            "risk":

                incident.get(

                    "enterprise_risk",

                    0

                )

        }