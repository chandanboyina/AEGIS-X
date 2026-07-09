class TimelineBuilder:
    """
    Enterprise Timeline Builder.

    Converts grouped events into
    chronological timelines.
    """

    def build(self, groups):

        timelines = []

        for key, events in groups.items():

            #
            # Sort by timestamp
            #

            ordered = sorted(

                events,

                key=lambda e:

                    e["event"].get(

                        "timestamp",

                        ""

                    )

            )

            timelines.append({

                "group": key,

                "events": ordered,

                "event_count": len(ordered)

            })

        return timelines