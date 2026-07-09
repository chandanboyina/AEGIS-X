from collectors.security.security_event_reader import SecurityEventReader


class SecurityCollector:
    """
    Enterprise Windows Security Collector.
    """

    def __init__(

        self,

        live=True,

        max_events=200

    ):

        self.live = live

        self.max_events = max_events

        self.reader = SecurityEventReader()

    def collect(self):

        if not self.live:

            return []

        return self.reader.read(

            max_events=self.max_events

        )

    def health(self):

        events = self.collect()

        return {

            "collector": "Windows Security",

            "mode": "Live",

            "installed": True,

            "events_collected": len(events),

            "status": "Healthy" if events else "No Events"

        }