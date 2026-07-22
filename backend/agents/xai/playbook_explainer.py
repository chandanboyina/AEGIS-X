class PlaybookExplainer:

    """
    Explains why the selected playbook
    was recommended.
    """

    def explain(
        self,
        commander
    ):

        strategy = commander["strategic_analysis"]["recommended"]

        if strategy is None:
            return {
                "summary": "No playbook was recommended.",
                "reasoning": [
                    "Predictive Intelligence did not return any candidate strategy."
                ]
            }

        return {

            "selected":

                strategy["candidate_id"],

            "base_playbook":

                strategy["base_playbook"],

            "playbook_name":

                strategy["playbook"]["name"],

            "confidence": strategy["confidence"],

            "historical_success": strategy["success_probability"],

            "estimated_loss": strategy["estimated_loss"],

            "recovery": strategy["estimated_recovery"],

            "reasoning": strategy["reasoning"]

        }