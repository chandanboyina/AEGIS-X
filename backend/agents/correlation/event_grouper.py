from collections import defaultdict
from datetime import datetime


class EventGrouper:
    """
    Enterprise Event Grouper.

    Groups events by

    • Host
    • User
    • Time Window
    """

    WINDOW = 300      # 5 minutes

    def group(self, events):

        groups = defaultdict(list)

        for event in events:

            e = event["event"]

            host = (

                e.get("hostname")

                or e.get("asset")

                or "Unknown"

            )

            user = (

                e.get("user")

                or "Unknown"

            )

            timestamp = self._bucket(

                e.get("timestamp")

            )

            key = (

                host,

                user,

                timestamp

            )

            groups[key].append(event)

        return groups

    def _bucket(self, timestamp):

        if not timestamp:

            return 0

        try:

            dt = datetime.fromisoformat(

                timestamp.replace(

                    "Z",

                    "+00:00"

                )

            )

        except Exception:

            return 0

        return int(

            dt.timestamp()

        ) // self.WINDOW