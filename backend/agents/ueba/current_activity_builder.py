from collections import defaultdict
from agents.common.event_resolver import EventResolver

class CurrentActivityBuilder:
    """
    Builds a real-time snapshot of
    enterprise activity from the
    current batch of events.
    """

    def __init__(self):

        pass

    def build(self, events):

        snapshot = {

            "users": defaultdict(

                lambda: {

                    "events": 0,

                    "powershell": 0,

                    "dns": 0,

                    "risk": 0

                }

            ),

            "hosts": defaultdict(

                lambda: {

                    "events": 0,

                    "risk": 0,

                    "powershell": 0,

                    "dns": 0

                }

            ),

            "processes": defaultdict(int)

        }

        for event in events:

            user = EventResolver.username(event)

            host = EventResolver.hostname(event)

            process = EventResolver.process(event)

            collector = EventResolver.collector(event)

            # USER STATISTICS

            snapshot["users"][user]["events"] += 1

            snapshot["users"][user]["risk"] += EventResolver.risk(event)

            if "powershell" in collector:

                snapshot["users"][user]["powershell"] += 1

            elif "dns" in collector:

                snapshot["users"][user]["dns"] += 1

            # HOST STATISTICS

            snapshot["hosts"][host]["events"] += 1

            snapshot["hosts"][host]["risk"] += EventResolver.risk(event)

            if "powershell" in collector:

                snapshot["hosts"][host]["powershell"] += 1

            elif "dns" in collector:

                snapshot["hosts"][host]["dns"] += 1

            snapshot["processes"][process] += 1

        return {

            "users": dict(snapshot["users"]),

            "hosts": dict(snapshot["hosts"]),

            "processes": dict(snapshot["processes"])

        }