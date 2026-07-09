class ObjectiveScore:
    """
    Shared scoring engine for every AI.

    Produces

    • normalized score
    • breakdown
    • weighted contributions
    """

    @staticmethod
    def calculate(
        subscores,
        weights
    ):

        weighted = {}

        total = 0

        for key, weight in weights.items():

            raw = subscores.get(
                key,
                0
            )

            contribution = raw * weight

            weighted[key] = {

                "raw": raw,

                "weight": weight,

                "contribution": round(
                    contribution,
                    2
                )

            }

            total += contribution

        score = round(

            max(
                0,
                min(
                    total,
                    100
                )
            )

        )

        return {

            "score": score,

            "breakdown": weighted

        }