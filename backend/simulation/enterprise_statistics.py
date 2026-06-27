from collections import Counter


class EnterpriseStatistics:
    """
    Generates enterprise-wide simulation statistics.
    """

    def summarize(self, packets):

        summary = {}

        summary["total_events"] = len(packets)

        # ---------------------------------------
        # Observer Decisions
        # ---------------------------------------

        decisions = Counter()

        priorities = Counter()

        severity = Counter()

        categories = Counter()

        assets = Counter()

        

        confidence_sum = 0

        for packet in packets:

            observer = packet["observer"]

            decisions[observer["decision"]] += 1

            priorities[observer["priority"]] += 1

            categories[
                observer["threat_category"]
            ] += 1

            assets[
                packet["asset"]["hostname"]
            ] += 1

            severity[
                packet["event"]["severity"]
            ] += 1

            confidence_sum += observer["confidence"]

        summary["decisions"] = dict(decisions)

        summary["priorities"] = dict(priorities)

        summary["categories"] = dict(categories)

        summary["assets"] = dict(
            assets.most_common(5)
        )

        if packets:

            summary["average_confidence"] = round(

                confidence_sum / len(packets),

                2,

            )

        else:

            summary["average_confidence"] = 0

        alerts = decisions.get("ALERT", 0)

        summary["alert_rate"] = round(
            alerts / len(packets) * 100,
            2
        ) if packets else 0

        summary["attack_rate"] = round(
            (summary["total_events"] - decisions.get("ALLOW", 0))
            / summary["total_events"] * 100,
            2,
        ) if summary["total_events"] else 0

        summary["highest_target"] = (
            assets.most_common(1)[0][0]
            if assets else "None"
        )

        attack_categories = {
            k: v
            for k, v in categories.items()
            if k != "Normal"
        }

        summary["most_common_threat"] = (
            max(
                attack_categories,
                key=attack_categories.get,
            )
            if attack_categories
            else "None"
        )

        summary["critical_incidents"] = severity.get(
            "CRITICAL",
            0
        )

        summary["high_incidents"] = severity.get(
            "HIGH",
            0
        )
        summary["severity"] = dict(severity)

        # ----------------------------------------
        # Enterprise Security Score (0-100)
        # ----------------------------------------

        alerts = decisions.get("ALERT", 0)

        risk = 100

        risk -= alerts * 5

        risk -= severity.get("CRITICAL", 0) * 8

        risk -= severity.get("HIGH", 0) * 4

        risk = max(0, risk)

        summary["security_score"] = risk

        return summary