from collections import defaultdict

class DebateEngine:
    """
    AI Council Debate Engine.

    Every AI agent explains
    why its recommendation
    should be selected.
    """

    def debate(
            self,
            votes
        ):

            grouped = defaultdict(list)

            for vote in votes:

                recommendation = vote.get("recommendation")

                if isinstance(recommendation, dict):

                    recommendation = (
                        recommendation
                        .get("recommended", {})
                        .get("playbook")
                        or recommendation
                        .get("recommended", {})
                        .get("base_playbook")
                        or recommendation
                        .get("recommended", {})
                        .get("candidate_id")
                        or "Unknown"
                    )

                grouped[recommendation].append(vote)

            debate = []

            for playbook, supporters in grouped.items():

                support = len(supporters)

                

                confidence = round(

                    sum(

                        v["confidence"]

                        for v in supporters

                    )

                    /

                    support

                )

                debate.append({

                    "playbook": playbook,

                    "support": support,

                    "average_confidence": confidence,

                    "supporters":[

                        {

                            "agent":v["agent"],

                            "confidence":v["confidence"],

                            "reason":v["reason"]

                        }

                        for v in supporters

                    ],

                    "alternatives":[
                        alt
                        for alt in vote.get(
                            "evaluation",
                            []
                        )[1:4]
                    ],

                })

            debate.sort(

                key=lambda x:(

                    x["support"],

                    x["average_confidence"]

                ),

                reverse=True

            )

            return debate