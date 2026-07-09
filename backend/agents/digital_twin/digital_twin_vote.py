from agents.council.base_decision_agent import BaseDecisionAgent


class DigitalTwinVote(BaseDecisionAgent):

    agent = "Digital Twin"

    objective = "Blast Radius Minimization"

    def weights(self):

        return {

            "spread":0.40,

            "recovery":0.25,

            "loss":0.20,

            "confidence":0.15

        }

    def bias_name(self):

        return "twin_bias"

    def subscores(

        self,

        candidate,

        incident,

        context

    ):

        return {

            "spread":

                max(
                    0,
                    100-context["predicted_spread"]*20
                ),

            "recovery":

                max(
                    0,
                    100-context["estimated_recovery"]*2
                ),

            "loss":

                max(
                    0,
                    100-context["estimated_loss"]*10
                ),

            "confidence":

                context["confidence"]

        }

    def strengths(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Lowest simulated attack spread",

            "Fastest enterprise recovery"

        ]

    def weaknesses(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Simulation dependent"

        ]

    def reasoning(

        self,

        candidate,

        incident,

        context,

        objective,

        bias

    ):

        return [

            f"Digital Twin Score {objective['score']}",

            f"Spread {context['predicted_spread']} services",

            f"Recovery {context['estimated_recovery']} min",

            f"Twin Bias {bias:+}"

        ]

    def evaluate_strategies(

        self,

        incident,

        strategies

    ):

        proposals=[]

        for strategy in strategies:

            candidate={

                "candidate_id":

                    strategy["candidate_id"],

                "base_playbook":

                    strategy["base_playbook"],

                "strategy":

                    strategy["strategy"],

                "metrics":

                    strategy["metrics"]

            }

            score=self.objective_score(

                candidate,

                incident,

                strategy

            )

            proposals.append(

                self.create_proposal(

                    candidate,

                    incident,

                    strategy,

                    score

                )

            )

        proposals.sort(

            key=lambda p:p.score,

            reverse=True

        )

        return proposals