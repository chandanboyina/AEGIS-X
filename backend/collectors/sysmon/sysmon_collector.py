from collectors.common.operational_event_reader import OperationalEventReader


class SysmonCollector:
    """
    Enterprise Sysmon Collector.

    Reads Microsoft Sysmon Operational logs.
    """

    def __init__(

        self,

        live=True,

        max_events=200

    ):

        self.live = live

        self.max_events = max_events

        self.reader = OperationalEventReader(
            "Microsoft-Windows-Sysmon/Operational"
        )

    def collect(self):

        if not self.live:

            return []

        return self.reader.read(

            max_events=self.max_events

        )

    def health(self):

        installed = self.reader.installed()

        events = self.collect() if installed else []

        return {

            "collector": "Sysmon",

            "mode": "Live",

            "installed": installed,

            "events_collected": len(events),

            "status":

                "Healthy"

                if installed

                else "Not Installed"

        }