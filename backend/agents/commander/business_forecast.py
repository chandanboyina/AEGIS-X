class BusinessForecast:
    """
    Estimates business impact for
    critical national infrastructure.
    """

    def predict(self, incident):

        category = incident["category"]

        severity = incident["severity"]

        affected_assets = (
            incident["investigation_summary"]["affected_assets"]
        )

        affected_users = (
            incident["investigation_summary"]["affected_users"]
        )

        impact = {

            "estimated_loss": "₹2 Crore",

            "downtime": "30 Minutes",

            "states_affected": 1,

            "schools_affected": 100,

            "citizens_affected": 50000,

            "criticality": "LOW"

        }

        if severity == "HIGH":

            impact["estimated_loss"] = "₹8 Crore"

            impact["downtime"] = "2 Hours"

            impact["states_affected"] = 3

            impact["schools_affected"] = 1200

            impact["citizens_affected"] = 400000

            impact["criticality"] = "HIGH"

        elif severity == "CRITICAL":

            impact["estimated_loss"] = "₹25 Crore"

            impact["downtime"] = "8 Hours"

            impact["states_affected"] = 12

            impact["schools_affected"] = 18000

            impact["citizens_affected"] = 4200000

            impact["criticality"] = "SEVERE"

        impact["affected_assets"] = affected_assets

        impact["affected_users"] = affected_users

        return impact