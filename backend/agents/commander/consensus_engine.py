class ConsensusEngine:
    """
    Enterprise AI Decision Council

    Collects votes from every intelligence
    engine and computes a weighted consensus.

    This is NOT majority voting.

    Confidence × Weight determines
    overall influence.
    """

    DEFAULT_WEIGHTS = {

        "Enterprise Brain":0.18,

        "Predictive":0.16,

        "Graph AI":0.14,

        "Cyber DNA":0.14,

        "UEBA":0.14,

        "Digital Twin":0.12,

        "Oracle":0.05,

        "Sentinel":0.03,

        "Business":0.02,

        "Enterprise Risk":0.02

    }

    def calculate(self, votes):

        weighted = 0
        total_weight = 0

        reasoning = []

        recommendation_scores = {}

        for vote in votes:

            weight = vote.get(

                "weight",

                self.DEFAULT_WEIGHTS.get(
                    vote["agent"],
                    0
                )

            )

            weighted += (
                vote["confidence"] * weight
            )

            total_weight += weight

            playbook = vote["recommendation"]

            recommendation_scores.setdefault(
                playbook,
                0
            )

            recommendation_scores[playbook] += (

                vote["confidence"] * weight

            )

            reasoning.append({

                "agent": vote["agent"],

                "recommendation": playbook,

                "confidence": vote["confidence"],

                "weight": round(weight, 2),

                "reason": vote.get("reason", []),

                "evidence": vote.get("evidence", {})

            })

        if total_weight:

            council_confidence = round(
                weighted / total_weight
            )

        else:

            council_confidence = 0

        winner = max(

            recommendation_scores,

            key=recommendation_scores.get

        )

        agreement = sum(

            1

            for vote in votes

            if vote["recommendation"] == winner

        )

        disagreement = len(votes) - agreement

        minority = [

            {

                "agent": vote["agent"],

                "recommendation": vote["recommendation"]

            }

            for vote in votes

            if vote["recommendation"] != winner

        ]

        return {

            "winner": winner,

            "confidence": council_confidence,

            "agreement": agreement,

            "disagreement": disagreement,

            "minority": minority,

            "votes": reasoning

        }