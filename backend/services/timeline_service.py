class TimelineService:
    """
    Commander Timeline.
    """

    def build(self, packet):

        commander = (

            packet
            .get("incident", {})
            .get("commander", {})

        )

        strategic = commander.get(
            "strategic_analysis",
            {}
        )

        return {

            "timeline":

                strategic.get(
                    "timeline",
                    []
                )

        }