from datetime import datetime


class AttackSessionBuilder:
    """
    Enterprise Attack Session Builder.

    Merges nearby timelines that belong
    to the same attack session.
    """

    SESSION_WINDOW = 900     # 15 minutes

    def build(self, timelines):

        #
        # Sort by host then time
        #

        timelines = sorted(

            timelines,

            key=lambda t: (

                t["group"][0],

                t["group"][2]

            )

        )

        sessions = []

        current = None

        for timeline in timelines:

            host = timeline["group"][0]

            bucket = timeline["group"][2]

            if current is None:

                current = {

                    "host": host,

                    "start_bucket": bucket,

                    "end_bucket": bucket,

                    "timelines": [timeline]

                }

                continue

            #
            # Same host
            #

            if (

                host == current["host"]

                and

                bucket - current["end_bucket"] <= 3

            ):

                current["timelines"].append(

                    timeline

                )

                current["end_bucket"] = bucket

            else:

                sessions.append(

                    current

                )

                current = {

                    "host": host,

                    "start_bucket": bucket,

                    "end_bucket": bucket,

                    "timelines": [timeline]

                }

        if current:

            sessions.append(current)

        return sessions