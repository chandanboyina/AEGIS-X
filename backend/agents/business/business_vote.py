from core.brain_service import brain


class BusinessVote:
    """
    Enterprise Business AI

    Evaluates every playbook and selects the one
    with the lowest estimated business loss.
    """

    def vote(
        self,
        incident,
        business
    ):

        playbooks = brain.get_playbook_templates(
            incident
        )

        if not playbooks:

            return {

                "agent": "Business",

                "recommendation": "None",

                "confidence": 0,

                "weight": 0.05,

                "reason": [

                    "No playbooks available."

                ],

                "evidence": {}

            }

        current_loss = business["estimated_loss_value"]

        best = None
        best_loss = float("inf")

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
                isolated * 0.25 +
                protected * 0.15 +
                blocked * 0.20
            )

            reduction = min(
                reduction,
                0.80
            )

            estimated_loss = round(

                current_loss *

                (1 - reduction),

                2

            )

            if estimated_loss < best_loss:

                best_loss = estimated_loss

                best = playbook

        confidence = max(

            20,

            min(

                95,

                round(

                    100 -

                    (best_loss / max(current_loss, 0.01)) * 60

                )

            )

        )

        return {

            "agent": "Business",

            "recommendation": best["id"],

            "confidence": confidence,

            "weight": 0.05,

            "reason": [

                f"Estimated business loss ₹{best_loss} Cr.",

                "Selected playbook minimizes financial impact."

            ],

            "evidence": {

                "estimated_loss": best_loss

            }

        }