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

        dna = {

            "category":

                incident.get("category"),

            "severity":

                incident.get("severity"),

            "mitre":

                incident["mitre"]["id"],

            "service":

                profile.get("service"),

            "business":

                profile.get("business_unit"),

            "criticality":

                profile.get("criticality"),

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

        dna["reasoning"] = [

            f"Attack category: {dna['category']}.",

            f"MITRE technique: {dna['mitre']}.",

            f"Business service: {dna['service']}.",

            f"Business unit: {dna['business']}.",

            f"Asset criticality: {dna['criticality']}.",

            f"Estimated affected users: {dna['users']}.",

            f"Enterprise risk score: {dna['risk']}."

        ]

        return dna