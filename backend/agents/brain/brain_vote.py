from agents.council.base_decision_agent import BaseDecisionAgent


class BrainVote(BaseDecisionAgent):
    """
    Enterprise Brain AI

    Chooses the playbook with the highest
    historical success probability.
    """

    agent = "Enterprise Brain"

    objective = "Historical Success"

    def weights(self):

        return {

            "history": 0.40,

            "similarity": 0.25,

            "intelligence": 0.20,

            "playbook_success": 0.15

        }

    def bias_name(self):

        return "history_bias"

    def subscores(
        self,
        candidate,
        incident,
        context
    ):

        history = context

        historical = history.get(
            "history",
            {}
        )

        similarity = history.get(
            "similarity",
            {}
        )

        intelligence = history.get(
            "intelligence",
            {}
        )

        history_score = historical.get(
            "success_rate",
            50
        )

        similarity_score = similarity.get(
            "score",
            50
        )

        intelligence_score = history.get(
            "intelligence_score",
            50
        )

        playbook_score = historical.get(
            "playbook_success",
            history_score
        )

        return {

            "history": history_score,

            "similarity": similarity_score,

            "intelligence": intelligence_score,

            "playbook_success": playbook_score

        }