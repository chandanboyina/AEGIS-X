class ForecastConfidence:
    """
    Enterprise Confidence Engine.

    Calculates prediction confidence
    using multiple cyber intelligence signals.
    """

    severity_score = {

        "LOW": 20,

        "MEDIUM": 45,

        "HIGH": 70,

        "CRITICAL": 95

    }

    critical_assets = [

        "Domain Controller",

        "Finance Server",

        "Student Database",

        "CBSE Examination Portal",

        "Active Directory",

        "VPN Gateway",

        "Backup Server"

    ]

    def calculate(self, incident):

        # ----------------------------
        # Behavior Score
        # ----------------------------

        behavior = incident["observer_confidence"]

        # ----------------------------
        # MITRE Confidence
        # ----------------------------

        mitre = incident["mitre_confidence"]

        # ----------------------------
        # IOC Density
        # ----------------------------

        iocs = min(

            len(incident["ioc_list"]) * 8,

            100

        )

        # ----------------------------
        # Severity
        # ----------------------------

        severity = self.severity_score.get(

            incident["severity"],

            20

        )

        # ----------------------------
        # Asset Criticality
        # ----------------------------

        profile = incident["asset_profile"]

        service = profile["service"]

        if service in self.critical_assets:

            asset_score = 100

        else:

            asset_score = 50

        # ----------------------------
        # Historical Confidence
        # (temporary until Memory Engine)
        # ----------------------------

        history = min(len(incident["ioc_list"]) * 6,100)

        # ----------------------------
        # Weighted Enterprise Score
        # ----------------------------

        confidence = (

            behavior * 0.30 +

            mitre * 0.20 +

            iocs * 0.15 +

            severity * 0.15 +

            asset_score * 0.10 +

            history * 0.10

        )

        confidence = round(confidence)

        confidence = max(

            35,

            min(confidence, 99)

        )

        return {

            "overall": confidence,

            "breakdown": {

                "behavior": behavior,

                "mitre": mitre,

                "ioc_density": iocs,

                "severity": severity,

                "asset": asset_score,

                "history": history

            }

        }