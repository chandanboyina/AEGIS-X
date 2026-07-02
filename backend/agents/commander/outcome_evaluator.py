class OutcomeEvaluator:
    """
    Evaluates how successful the selected playbook was.

    This is NOT real incident closure.

    It estimates the likely outcome from
    Predictive Intelligence.

    Future versions can use:

    • SOC analyst feedback
    • SIEM alerts
    • Recovery confirmation
    • Endpoint telemetry
    """

    def evaluate(

        self,

        strategy,

        business

    ):

        original_loss = business[
            "estimated_loss_value"
        ]

        predicted_loss = strategy[
            "estimated_loss"
        ]

        spread = strategy[
            "predicted_spread"
        ]

        recovery = strategy[
            "estimated_recovery"
        ]

        # -------------------------
        # Success
        # -------------------------

        success = (

            spread <= 1

            and

            predicted_loss <
            original_loss * 0.40

        )

        # -------------------------
        # Analyst Rating
        # -------------------------

        rating = 5

        if success:

            rating = 9

            if recovery <= 10:

                rating = 10

        elif predicted_loss < original_loss * 0.70:

            rating = 7

        elif predicted_loss < original_loss:

            rating = 6

        else:

            rating = 3

        # -------------------------
        # Confidence
        # -------------------------

        quality = round(

            (

                strategy["success_probability"]

                +

                strategy["confidence"]

            ) / 2,

            1

        )

        return {

            "success": success,

            "analyst_rating": rating,

            "quality": quality

        }