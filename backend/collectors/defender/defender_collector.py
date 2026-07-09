from collectors.common.operational_event_reader import OperationalEventReader


class DefenderCollector:
    """
    Enterprise Windows Defender Collector.

    Reads Windows Defender Operational logs.
    """

    CHANNEL = (
        "Microsoft-Windows-Windows Defender/Operational"
    )

    def __init__(

        self,

        live=True,

        max_events=200

    ):

        self.live = live

        self.max_events = max_events

        self.reader = OperationalEventReader(

            self.CHANNEL

        )

    def collect(self):

        if not self.live:

            return []

        return self.reader.read(

            max_events=self.max_events

        )

    def health(self):

        events = self.collect()

        return {

            "collector":

                "Windows Defender",

            "channel":

                self.CHANNEL,

            "installed":

                len(events) > 0,

            "events":

                len(events),

            "status":

                "Healthy"

                if events

                else "Unavailable"

        }