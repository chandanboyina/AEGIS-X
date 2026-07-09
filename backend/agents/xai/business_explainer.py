class BusinessExplainer:

    def explain(
        self,
        commander
    ):

        strategy = commander["strategic_analysis"]["recommended"]

        return {

            "loss": strategy["estimated_loss"],

            "recovery": strategy["estimated_recovery"],

            "services_saved": strategy["services_saved"],

            "reasoning": [

                f"Estimated financial loss ₹{strategy['estimated_loss']} Cr.",

                f"Recovery time {strategy['estimated_recovery']} minutes.",

                f"{strategy['services_saved']} services protected."

            ]

        }