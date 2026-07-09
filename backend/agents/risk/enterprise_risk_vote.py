from agents.council.base_decision_agent import BaseDecisionAgent


class EnterpriseRiskVote(BaseDecisionAgent):
    """
    Enterprise Risk AI

    Objective:
    Reduce overall enterprise risk.
    """

    agent = "Enterprise Risk"

    objective = "Enterprise Risk Reduction"

    def weights(self):

        return {

            "likelihood": 0.35,

            "impact": 0.30,

            "exposure": 0.20,

            "criticality": 0.15

        }

    def bias_name(self):

        return "risk_bias"

    def subscores(
        self,
        candidate,
        incident,
        context
    ):
        graph = context["graph"]

        remaining = graph["remaining_probability"]

        confidence = context["confidence"]

        loss = context["estimated_loss"]

        recovery = context["estimated_recovery"]

        return {

            "likelihood":

                100 - remaining,

            "impact":

                max(

                    0,

                    100 - loss * 10

                ),

            "exposure":

                max(

                    0,

                    100 - recovery * 2

                ),

            "criticality":

                confidence

        }
    
    def strengths(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Reduces enterprise-wide risk",

            "Protects critical business services"

        ]


    def weaknesses(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "May increase containment time"

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

            f"Enterprise Risk Score {objective['score']}",

            f"Risk Bias {bias:+}",

            "Evaluated likelihood, impact, exposure and criticality."

        ]
    
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