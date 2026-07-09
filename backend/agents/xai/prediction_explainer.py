class PredictionExplainer:

    def explain(self, commander):

        strategy = commander["strategic_analysis"]["recommended"]

        return {

            "playbook":

                strategy["playbook"],

            "confidence":

                strategy["confidence"],

            "reasoning":[

                f"Predicted success probability {strategy['success_probability']}%.",

                f"Estimated recovery time {strategy['estimated_recovery']} minutes.",

                f"Estimated financial loss ₹{strategy['estimated_loss']} Cr."

            ]

        }