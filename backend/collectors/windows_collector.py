import json
from pathlib import Path
from collectors.windows_event_reader import WindowsEventReader


class WindowsCollector:

    """
    Windows Event Collector

    Supports:

    • Sample JSON logs
    • Future Live Windows Event Logs
    """

    def __init__(
        self,
        path=None,
        live=False,
        log_types=None
    ):

        self.live = live

        self.path = Path(path) if path else None

        self.reader = WindowsEventReader()

        self.events_collected = 0

        if log_types is None:

            log_types = [

                "Application"

            ]

        self.log_types = log_types

        

    def collect(self):

        if self.live:

            return self.collect_live()

        return self.collect_sample()

    # ----------------------------------
    # Sample JSON Mode
    # ----------------------------------

    def collect_sample(self):

        if self.path is None:

            return []

        if not self.path.exists():

            return []

        with open(

            self.path,

            encoding="utf-8"

        ) as f:

            events = json.load(f)

        self.events_collected += len(events)

        return events

    # ----------------------------------
    # Live Windows Mode
    # ----------------------------------

    def collect_live(
        self,
        limit=100
    ):

        events = []

        for log_name in self.log_types:

            try:

                records = self.reader.read(

                    log_name,

                    limit

                )

            except Exception as e:

                print(

                    f"[WindowsCollector] "

                    f"Skipped '{log_name}' "

                    f"({e})"

                )

                continue

            for record in records:

                events.append({

                    "timestamp":

                        record.TimeGenerated.isoformat(),

                    "source":

                        record.SourceName,

                    "collector":

                        log_name,

                    "event":

                        record.SourceName,

                    "event_id":

                        record.EventID & 0xFFFF,

                    "severity":

                        self.map_event_type(

                            record.EventType

                        ),

                    "asset":

                        "localhost",

                    "user":

                        None,

                    "source_ip":

                        None,

                    "destination_ip":

                        None

                })

        self.events_collected = len(events)

        return events
    
    def map_event_type(
        self,
        event_type
    ):

        mapping = {

            1: "ERROR",

            2: "WARNING",

            4: "INFO",

            8: "SUCCESS",

            16: "FAILURE"

        }

        return mapping.get(

            event_type,

            "INFO"

        )