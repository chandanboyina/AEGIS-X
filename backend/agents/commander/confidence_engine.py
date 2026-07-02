import math

class ConfidenceEngine:
    """
    Enterprise Confidence Engine

    Computes confidence using evidence instead
    of fixed values.

    Confidence is NOT the same as success rate.

    Confidence answers:

        "How certain are we that this prediction
         is reliable?"
    """

    def calculate(
        self,
        history,
        similarity,
        enterprise_risk,
        graph,
        predicted_spread,
        original_spread
    ):

        # --------------------------
        # Historical Success
        # --------------------------

        success = history.get("success_rate", 70)

        # --------------------------
        # Number of observations
        # --------------------------

        observations = history.get(
            "observations",
            0
        )

        observation_score = min(

            100,

            round(

                math.log2(
                    observations + 1
                ) * 20

            )

        )
        # --------------------------
        # Digital Twin Match
        # --------------------------

        if original_spread == 0:

            twin_score = 100

        else:

            reduction = (

                original_spread -

                predicted_spread

            ) / original_spread

            twin_score = round(

                reduction * 100

            )

        # --------------------------
        # Attack Graph Containment
        # --------------------------

        graph_score = (

            100 -

            graph["remaining_probability"]

        )


        # --------------------------
        # Containment Score
        # --------------------------

        if original_spread == 0:
            containment_score = 100
        else:
            containment_score = round(
                (
                    original_spread -
                    predicted_spread
                )
                /
                original_spread
                * 100
            )

        # --------------------------
        # Enterprise Risk
        # --------------------------

        risk_score = enterprise_risk

        # --------------------------
        # Final Weighted Confidence
        # --------------------------

        confidence = round(
            success * 0.35 +
            similarity * 0.20 +
            graph_score * 0.15 +
            twin_score * 0.10 +
            containment_score * 0.10 +
            observation_score * 0.10
        )

        confidence = max(
            15,
            min(
                confidence,
                99
            )
        )

        if confidence >= 90:
            level = "Very High"
        elif confidence >= 75:
            level = "High"
        elif confidence >= 55:
            level = "Medium"
        elif confidence >= 35:
            level = "Low"
        else:
            level = "Very Low"

        return {

            "confidence": confidence,

            "level": level,

            "breakdown": {

                "historical_success": success,

                "observation_score": observation_score,

                "observations": observations,

                "similarity": similarity,

                "digital_twin": twin_score,

                "attack_graph": graph_score,

                #"enterprise_risk": risk_score,

                "containment": containment_score

            }

        }