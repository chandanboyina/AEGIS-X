class SimilarityEngine:
    """
    Finds historical incidents that are
    most similar to the current incident.
    """

    def compare(self, current, previous):

        score = 0

        reasons = []

        if current["category"] == previous["category"]:
            score += 30
            reasons.append("Same attack category")

        if current["severity"] == previous["severity"]:
            score += 20
            reasons.append("Same severity")

        if current["mitre"]["id"] == previous["mitre"]["id"]:
            score += 25
            reasons.append("Same MITRE technique")

        if current["asset"] == previous["asset"]:
            score += 15
            reasons.append("Same asset")

        current_iocs = len(current["ioc_list"])
        previous_iocs = len(previous.get("ioc_list", []))

        difference = abs(current_iocs - previous_iocs)

        score += max(0, 10 - difference)

        return {

            "similarity": min(score, 100),

            "reasons": reasons

        }