from core.brain_service import brain
from agents.council.models.agent_proposal import AgentProposal
from agents.knowledge_graph.playbook_repository import PlaybookRepository
from agents.council.base_decision_agent import BaseDecisionAgent




class BusinessVote(BaseDecisionAgent):
    """
    Enterprise Business AI

    Evaluates every playbook and selects the one
    with the lowest estimated business loss.
    """

    agent = "Business"

    objective = "Business Continuity"

    def weights(self):

        return {

            "financial_loss": 0.25,

            "downtime": 0.20,

            "critical_services": 0.15,

            "business_continuity": 0.15,

            "customer_impact": 0.10,

            "compliance": 0.10,

            "reputation": 0.05

        }
    
    def bias_name(self):

        return "business_bias"

    def subscores(
        self,
        candidate,
        incident,
        context
    ):

        return {

            # Lower financial loss = better score
            "financial_loss":

                max(
                    0,
                    100 - context["estimated_loss"] * 20
                ),

            # Faster recovery = better score
            "downtime":

                max(
                    0,
                    100 - context["estimated_recovery"]
                ),

            # More protected services = better
            "critical_services":

                min(
                    100,
                    context["services_saved"] * 20
                ),

            # Simulation confidence becomes continuity
            "business_continuity":

                context["confidence"],

            # Future: simulator can calculate these
            "customer_impact":

                context.get(
                    "customer_score",
                    80
                ),

            "compliance":

                context.get(
                    "compliance_score",
                    90
                ),

            "reputation":

                context.get(
                    "reputation_score",
                    85
                )

        }
    
    def strengths(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Lowest financial impact",

            "Protects critical business services",

            "Minimizes downtime",

            "Preserves business continuity"

        ]
    
    def weaknesses(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "May sacrifice aggressive containment",

            "Prioritizes business availability"

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

            f"Business Score {objective['score']}",

            f"Estimated Loss ₹{context['estimated_loss']} Cr",

            f"Recovery {context['estimated_recovery']} min",

            f"Services Saved {context['services_saved']}",

            f"Business Bias {bias:+}"

        ]


    def vote(
            self,
            business,
            strategies
        ):
            
            incident = {

                "category": "Credential Dumping"

            }

            best = min(
                strategies,
                key=lambda s: s["estimated_loss"]
            )

            context = {

                "estimated_loss": best["estimated_loss"],

                "estimated_recovery": best["estimated_recovery"],

                "services_saved": best["services_saved"],

                "continuity": 85

            }

            proposals = self.evaluate_strategies(

                incident,

                strategies

            )

            best_proposal = proposals[0]

            if not strategies:

                return {

                    "agent": "Business",

                    "recommendation": "None",

                    "confidence": 0,

                    "weight": 0.05,

                    "reason": [

                        "No simulated strategies available."

                    ],

                    "evidence": {}

                }

            best = min(

                strategies,

                key=lambda s: s["estimated_loss"]

            )

            loss = best["estimated_loss"]

            # ---------------------------------
            # Confidence
            # ---------------------------------

            current_loss = business["estimated_loss_value"]

            loss_ratio = loss / max(
                current_loss,
                0.01
            )

            reduction = 1 - loss_ratio

            confidence = round(

                35 +

                reduction * 50

            )

            confidence = max(

                35,

                min(

                    confidence,

                    90

                )

            )

            return {

                "agent": "Business",

                "recommendation": best["candidate_id"],

                "confidence": confidence,

                "weight": 0.05,

                "reason": [

                    f"Lowest estimated financial loss ₹{loss} Cr.",

                    f"Recovery time {best['estimated_recovery']} minutes.",

                    "Recommendation based on simulated business impact."

                ],

                "evidence": {

                    "strategy": best["strategy"],

                    "estimated_loss": loss,

                    "services_saved": best["services_saved"],

                    "recovery": best["estimated_recovery"],

                    "confidence": best["confidence"]


                },

                "proposal": best_proposal,

                "alternatives": proposals[1:4],

            }
    
    def evidence(
        self,
        candidate,
        incident,
        context,
        objective
    ):
        return {
            "strategy": candidate["strategy"],
            "metrics": candidate["metrics"],
            "objective": objective
        }


    def confidence(
        self,
        score
    ):
        return min(round(score), 95)
    

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

                "playbook":
                    strategy["candidate_id"],

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