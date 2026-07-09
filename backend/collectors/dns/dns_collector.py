from collectors.common.operational_event_reader import OperationalEventReader


class DNSCollector:

    LOG_NAME = "Microsoft-Windows-DNS-Client/Operational"

    def __init__(self, max_events=200):

        self.max_events = max_events

        self.reader = OperationalEventReader(self.LOG_NAME)

    def collect(self):

        return self.reader.read(self.max_events)

    def health(self):

        events = self.collect()

        return {

            "collector": "DNS",

            "installed": True,

            "events_collected": len(events),

            "status": "Healthy"

        }