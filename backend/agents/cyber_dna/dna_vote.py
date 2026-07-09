from agents.council.base_decision_agent import BaseDecisionAgent


class DNAVote(BaseDecisionAgent):

    agent = "Cyber DNA"

    objective = "Historical Attack Similarity"

    def weights(self):

        return {

            "dna_similarity": 0.50,

            "confidence": 0.20,

            "attack_success": 0.15,

            "containment": 0.15

        }

    def bias_name(self):

        return "dna_bias"

    def subscores(
        self,
        candidate,
        incident,
        context
    ):

        return {

            "dna_similarity":

                context.get(
                    "dna_similarity",
                    0
                ),

            "confidence":

                context["confidence"],

            "attack_success":

                context["success_probability"],

            "containment":

                max(
                    0,
                    100 - context["predicted_spread"] * 20
                )

        }

    def strengths(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Matches historical attack campaigns",

            "Leverages enterprise attack DNA"

        ]

    def weaknesses(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Depends on historical similarity"

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

            f"DNA Score {objective['score']}",

            f"Similarity {context.get('dna_similarity',0):.1f}%",

            f"DNA Bias {bias:+}"

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

            proposals.append(proposal)

        proposals.sort(

            key=lambda p: p.score,

            reverse=True

        )

        return proposals
    
    def vote(
        self,
        incident,
        strategies
    ):

        if not strategies:

            return {

                "agent": self.agent,

                "recommendation": "None",

                "confidence": 0,

                "weight": 0.15,

                "reason": [

                    "No simulated strategies."

                ]

            }

        proposals = self.evaluate_strategies(

            incident,

            strategies

        )

        best = proposals[0]

        return {

            "agent": self.agent,

            "recommendation": best.playbook,

            "confidence": best.confidence,

            "weight": 0.15,

            "reason": [

                f"Historical DNA score {best.score}."

            ],

            "proposal": best,

            "alternatives": proposals[1:4]

        }