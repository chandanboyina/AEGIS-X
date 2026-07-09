class DNSHealth:
    """
    Enterprise DNS Behavior Analysis.
    """

    def evaluate(self, features):

        score = 0

        findings = []

        if features["long_domain"]:

            score += 20
            findings.append("Long Domain")

        if features["many_subdomains"]:

            score += 25
            findings.append("Many Subdomains")

        if features["suspicious_tld"]:

            score += 25
            findings.append("Suspicious TLD")

        if features["possible_dga"]:

            score += 30
            findings.append("Possible DGA")

        if features["failed_lookup"]:

            score += 10
            findings.append("Failed Lookup")

        score = min(score, 100)

        if score >= 70:

            status = "Critical"

        elif score >= 40:

            status = "Warning"

        else:

            status = "Healthy"

        return {

            "behavior_score": score,

            "status": status,

            "findings": findings

        }