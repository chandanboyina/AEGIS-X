class ImpactEstimator:
    """
    Estimates enterprise impact using:

    • Attack category
    • Asset criticality
    • Enterprise size
    • IOC density
    • Service importance

    This is deterministic and explainable.
    """

    def estimate(self, incident):

        profile = incident["asset_profile"]

        category = incident["category"]

        criticality = profile["criticality"]

        enterprise_users = profile["enterprise_users"]

        iocs = len(incident["ioc_list"])

        # ---------------------------------------
        # Initial compromise percentage
        # ---------------------------------------

        spread = {

            "Reconnaissance": 0.001,

            "Credential Access": 0.01,

            "Privilege Escalation": 0.03,

            "Malware": 0.08,

            "Ransomware": 0.15

        }

        percent = spread.get(category, 0.01)

        # ---------------------------------------
        # Criticality multiplier
        # ---------------------------------------

        multiplier = {

            "Critical": 2.0,

            "High": 1.5,

            "Medium": 1.2,

            "Low": 1.0

        }

        percent *= multiplier.get(

            criticality,

            1.0

        )

        # ---------------------------------------
        # IOC Density

        # More evidence generally means
        # broader compromise.
        # ---------------------------------------

        percent *= (1 + (iocs / 25))

        # ---------------------------------------
        # Estimated affected users
        # ---------------------------------------

        affected_users = int(

            enterprise_users * percent

        )

        affected_users = max(

            affected_users,

            10

        )

        # ---------------------------------------
        # Estimated assets

        # Roughly 1 asset per 250 users.
        # ---------------------------------------

        affected_assets = max(

            1,

            affected_users // 250

        )

        return {

            "affected_assets":

                affected_assets,

            "affected_users":

                affected_users,

            "spread_percent":

                round(percent * 100, 2)

        }