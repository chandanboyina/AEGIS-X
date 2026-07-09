from core.brain_service import brain
from agents.risk.enterprise_risk_vote import EnterpriseRiskVote


class RiskVote:
    """
    Enterprise Risk AI

    Evaluates every playbook and selects the one
    predicted to produce the lowest enterprise risk.
    """

    def vote(
        self,
        incident,
        strategies
    ):

        engine = EnterpriseRiskVote()

        proposals = engine.evaluate_strategies(

            incident,

            strategies

        )

        best = proposals[0]

        return {

            "agent":"Enterprise Risk",

            "recommendation":

                best.playbook,

            "confidence":

                best.confidence,

            "weight":0.05,

            "reason":[

                f"Predicted enterprise risk score {best.score}.",

                "Selected lowest enterprise-wide risk."

            ],

            "proposal":best,

            "alternatives":proposals[1:4]

        }