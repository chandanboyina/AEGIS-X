class CouncilExplainer:

    """
    Explains how the AI Council reached
    its decision.
    """

    def explain(
        self,
        votes
    ):

        if not votes:

            return {

                "winner": None,

                "agreement": 0,

                "minority": [],

                "reasoning": []

            }

        winner = max(
            votes,
            key=lambda v: v["confidence"] * v["weight"]
        )["recommendation"]

        agreement = sum(
            1
            for vote in votes
            if vote["recommendation"] == winner
        )

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

            "agreement": agreement,

            "total": len(votes),

            "minority": minority,

            "reasoning": [

                f"{agreement}/{len(votes)} AI agents supported the final recommendation.",

                f"{len(minority)} agent(s) proposed alternatives."

            ]

        }