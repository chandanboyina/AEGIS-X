class DowntimeEngine:
    """
    Estimates recovery time based on
    attack type, criticality, automation,
    and recovery maturity.
    """

    attack_ranges = {

        "Reconnaissance": (0.5, 2),

        "Credential Access": (1, 6),

        "Privilege Escalation": (2, 12),

        "Malware": (4, 24),

        "Ransomware": (8, 72)

    }

    recovery_multiplier = {

        "Critical": 1.4,

        "High": 1.2,

        "Medium": 1.0,

        "Low": 0.8

    }

    def estimate(self, incident, enterprise_score):

        category = incident["category"]

        criticality = incident["asset_profile"]["criticality"]

        low, high = self.attack_ranges.get(category, (1, 4))

        # Risk chooses a point within the range
        risk_factor = enterprise_score / 100

        hours = low + ((high - low) * risk_factor)

        hours *= self.recovery_multiplier.get(criticality, 1)

        return round(hours, 1)