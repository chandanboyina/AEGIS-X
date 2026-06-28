class TimelineGenerator:
    """
    Generates a chronological timeline
    for a correlated attack campaign.
    """

    def build(self, campaign):

        timeline = []

        for packet in campaign["events"]:

            timeline.append({

                "timestamp":
                    packet["event"]["timestamp"],

                "event":
                    packet["event"]["event_type"],

                "asset":
                    packet["asset"]["hostname"],

                "category":
                    packet["oracle"]["category"],

            })

        timeline.sort(
            key=lambda x: x["timestamp"]
        )

        campaign["timeline"] = timeline

        return campaign