class ExperienceReplay:
    """
    Finds the most similar historical incident.

    Used for explainable recommendations.

    Similar to how experienced analysts remember
    previous attacks.
    """

    def replay(
        self,
        incident,
        records
    ):

        if not records:
            return None

        best = None

        best_score = -1

        for record in records:

            score = 0

            # -------------------------
            # Category
            # -------------------------

            if (
                record["attack"] ==
                incident.get("category")
            ):
                score += 40

            # -------------------------
            # MITRE
            # -------------------------

            record_mitre = (
                record["fingerprint"]["mitre"]
            )

            incident_mitre = (
                incident
                .get("mitre", {})
                .get("id", "UNKNOWN")
            )

            if record_mitre == incident_mitre:
                score += 30

            # -------------------------
            # Asset
            # -------------------------

            if (
                record["asset"] ==
                incident.get("asset")
            ):
                score += 20

            # -------------------------
            # Severity
            # -------------------------

            if (
                record["severity"] ==
                incident.get("severity")
            ):
                score += 10

            if score > best_score:

                best_score = score

                best = record

        if best is None:
            return None

        return {

            "incident_id": best["incident_id"],

            "similarity": best_score,

            "playbook": best["playbook"],

            "success": best["success"],

            "recovery": best["recovery_minutes"],

            "loss": best["business_loss"],

            "historical_rating": best["analyst_rating"],

            "historical_services_saved": best["services_saved"],

            "historical_blast_reduction": best["blast_radius_before"] - best["blast_radius_after"],

            "reasoning":[

                f"{best_score}% similarity to historical incident.",

                f"Recovered in {best['recovery_minutes']} minutes.",

                f"Business loss ₹{best['business_loss']} Cr.",

                f"Analyst rating {best['analyst_rating']}/10.",

                f"Saved {best['services_saved']} enterprise services."

            ]

        }