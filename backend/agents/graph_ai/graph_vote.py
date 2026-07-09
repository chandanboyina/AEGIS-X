from agents.council.base_decision_agent import BaseDecisionAgent


class GraphVote(BaseDecisionAgent):
    """
    Enterprise Graph AI
    """

    agent = "Graph AI"

    objective = "Blast Radius Reduction"

    def weights(self):

        return {

            "attack_interruption": 0.40,

            "critical_assets": 0.25,

            "attack_depth": 0.20,

            "graph_density": 0.15

        }

    def bias_name(self):

        return "graph_bias"

    def subscores(
        self,
        candidate,
        incident,
        context
    ):

        graph = context["graph"]

        removed = len(

            graph.get(

                "removed_stages",

                []

            )

        )

        remaining = len(

            graph.get(

                "remaining_path",

                []

            )

        )

        return {

            "attack_interruption":

                min(

                    removed * 25,

                    100

                ),

            "critical_assets":

                100 if graph.get(

                    "stopped",

                    False

                ) else 70,

            "attack_depth":

                max(

                    0,

                    100 -

                    remaining * 20

                ),

            "graph_density":

                100 -

                graph.get(

                    "remaining_probability",

                    100

                )

        }

    def vote(
        self,
        incident,
        strategies
    ):

        proposals = self.evaluate_strategies(

            incident,

            strategies

        )

        best = proposals[0]

        graph = strategies[0]["graph"]

        return {

            "agent": self.agent,

            "recommendation": best.playbook,

            "confidence": best.confidence,

            "weight": 0.15,

            "reason" :[

                f"Evaluated {len(proposals)} playbook strategies.",

                f"Removed {len(graph['removed_stages'])} attack stages.",

                f"{len(graph['remaining_path'])} attack stages remain.",

                f"Remaining attack probability {graph['remaining_probability']}%."

            ],

            "proposal": best,

            "alternatives": proposals[1:4],

            "ranking": proposals,

        }
    
    def evaluate_strategies(
        self,
        incident,
        strategies
    ):

        proposals = []

        for strategy in strategies:

            candidate = {

                "candidate_id":
                    strategy["candidate_id"],

                "base_playbook":
                    strategy["base_playbook"],

                "strategy":
                    strategy["strategy"],

                "metrics":
                    strategy["metrics"]

            }

            score_data = self.objective_score(

                candidate,

                incident,

                strategy

            )

            proposal = self.create_proposal(

                candidate,

                incident,

                strategy,

                score_data

            )

            proposals.append(
                proposal
            )

        proposals.sort(

            key=lambda p: p.score,

            reverse=True

        )

        return proposals