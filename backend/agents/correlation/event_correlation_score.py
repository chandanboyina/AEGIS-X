from datetime import datetime


class EventCorrelationScore:
    """
    Scores how strongly multiple telemetry
    events are related to the same attack.
    """

    def calculate(
        self,
        events
    ):

        if len(events) <= 1:

            return {

                "score": 100,

                "reasons": [

                    "Single event."

                ]

            }

        score = 0

        reasons = []

        # -------------------------
        # Same Asset
        # -------------------------

        assets = {

            e.get("asset")

            for e in events

        }

        if len(assets) == 1:

            score += 30

            reasons.append(

                "Same asset."

            )

        # -------------------------
        # Same User
        # -------------------------

        users = {

            e.get("user")

            for e in events

            if e.get("user")

        }

        if len(users) == 1 and users:

            score += 20

            reasons.append(

                "Same user."

            )

        # -------------------------
        # Same Category
        # -------------------------

        categories = {

            e.get("category")

            for e in events

        }

        categories.discard(None)
        categories.discard("Unknown")

        if len(categories) == 1 and categories:

            score += 20

            reasons.append(

                "Same attack category."

            )

        # -------------------------
        # Same MITRE Tactic
        # -------------------------

        tactics = {

            e.get(
                "mitre",
                {}
            ).get(
                "tactic"
            )

            for e in events
        }

        tactics.discard(None)
        tactics.discard("Unknown")

        if len(tactics) == 1 and tactics:

            score += 20

            reasons.append(

                "Same MITRE tactic."

            )

        # -------------------------
        # Time Window
        # -------------------------

        try:

            timestamps = [

                datetime.fromisoformat(

                    e["timestamp"].replace(
                        "Z",
                        ""
                    )

                )

                for e in events

            ]

            seconds = (

                max(timestamps)

                -

                min(timestamps)

            ).total_seconds()

            if seconds <= 600:

                score += 10

                reasons.append(

                    "Occurred within 10 minutes."

                )

        except Exception:

            pass

        return {

            "score": min(
                score,
                100
            ),

            "reasons": reasons

        }