class ExplainableAI:
    """
    Enterprise Explainable AI (XAI)

    Explains WHY the selected playbook won
    and WHY alternatives lost.
    """

    def explain(

        self,

        selected,

        strategies

    ):

        explanation = {

            "decision": selected["playbook"],

            "because": [],

            "why_not": {}

        }

        # ----------------------------
        # Why selected
        # ----------------------------

        explanation["because"] = [

            f"Highest confidence ({selected['confidence']}%).",

            f"Historical success {selected['success_probability']}%.",

            f"Estimated recovery {selected['estimated_recovery']} minutes.",

            f"Predicted business loss ₹{selected['estimated_loss']} Cr.",

            f"Predicted spread {selected['predicted_spread']} services."

        ]

        # ----------------------------
        # Why others lost
        # ----------------------------

        for strategy in strategies:

            if strategy["playbook"] == selected["playbook"]:
                continue

            reasons = []

            if strategy["estimated_loss"] > selected["estimated_loss"]:

                reasons.append(

                    "Higher business loss"

                )

            if strategy["estimated_recovery"] > selected["estimated_recovery"]:

                reasons.append(

                    "Longer recovery time"

                )

            if strategy["confidence"] < selected["confidence"]:

                reasons.append(

                    "Lower confidence"

                )

            if strategy["predicted_spread"] > selected["predicted_spread"]:

                reasons.append(

                    "Larger predicted spread"

                )

            explanation["why_not"][

                strategy["playbook"]

            ] = reasons

        return explanation