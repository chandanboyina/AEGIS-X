from core.brain_service import brain


class RiskVote:
    """
    Enterprise Risk AI

    Evaluates every playbook and selects the one
    predicted to produce the lowest enterprise risk.
    """

    def vote(
        self,
        incident,
        enterprise_risk
    ):

        playbooks = brain.get_playbook_templates(
            incident
        )

        if not playbooks:

            return {

                "agent": "Enterprise Risk",

                "recommendation": "None",

                "confidence": 0,

                "weight": 0.05,

                "reason": [

                    "No playbooks available."

                ],

                "evidence": {}

            }

        current_risk = enterprise_risk["enterprise_score"]

        best = None
        best_risk = float("inf")

        for playbook in playbooks:

            actions = playbook.get(
                "actions",
                {}
            )

            isolated = len(
                actions.get(
                    "isolate",
                    []
                )
            )

            protected = len(
                actions.get(
                    "protect",
                    []
                )
            )

            blocked = len(
                actions.get(
                    "block",
                    []
                )
            )

            reduction = (

                isolated * 8 +

                protected * 5 +

                blocked * 6

            )

            predicted_risk = max(

                0,

                current_risk - reduction

            )

            if predicted_risk < best_risk:

                best_risk = predicted_risk

                best = playbook

        confidence = round(

            100 -

            (best_risk / max(current_risk, 1)) * 60

        )

        confidence = max(
            20,
            min(
                confidence,
                95
            )
        )

        return {

            "agent": "Enterprise Risk",

            "recommendation": best["id"],

            "confidence": confidence,

            "weight": 0.05,

            "reason": [

                f"Predicted enterprise risk {best_risk}/100.",

                "Selected playbook minimizes enterprise risk."

            ],

            "evidence": {

                "risk": best_risk

            }

        }