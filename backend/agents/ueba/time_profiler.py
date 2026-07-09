from collections import defaultdict
from datetime import datetime
from agents.ueba.behavior_database import BehaviorDatabase
from agents.common.event_resolver import EventResolver

class TimeProfiler:
    """
    Enterprise Time Behavior Profiler.

    Learns when users, hosts and
    processes normally operate.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

    def update(self, event):

        host = EventResolver.hostname(event)

        profile = self.db.get_time_profile(host)

        if profile is None:

            profile = {}

        profile.setdefault("hours", {})

        profile.setdefault("weekdays", {})

        profile.setdefault("powershell", {})

        profile.setdefault("dns", {})

        profile.setdefault("security", {})

        profile.setdefault("mitre", {})

        profile.setdefault("risk", {})

        timestamp = EventResolver.timestamp(event)

        if not timestamp:

            return

        #
        # Parse ISO timestamp
        #

        try:

            dt = datetime.fromisoformat(

                timestamp.replace(

                    "Z",

                    "+00:00"

                )

            )

        except Exception:

            return

        hour = dt.hour

        weekday = dt.strftime("%A")

        

        profile["hours"][str(hour)] = (

            profile["hours"].get(

                str(hour),

                0

            )

            + 1

        )

        profile["weekdays"][weekday] = (

            profile["weekdays"].get(

                weekday,

                0

            )

            + 1

        )

        collector = EventResolver.collector(event)

        if "powershell" in collector:

            profile["powershell"][str(hour)] = (

                profile["powershell"].get(

                    str(hour),

                    0

                )

                + 1

            )

        elif "dns" in collector:

            profile["dns"][str(hour)] = (

                profile["dns"].get(

                    str(hour),

                    0

                )

                + 1

            )

        elif "security" in collector:

            profile["security"][str(hour)] = (

                profile["security"].get(

                    str(hour),

                    0

                )

                + 1

            )

        technique = EventResolver.mitre(event)

        if (

            technique

            and

            technique != "Unknown"

        ):

            profile["mitre"][technique] = (

                profile["mitre"].get(

                    technique,

                    0

                )

                + 1

            )

        profile["risk"][str(hour)] = (

            profile["risk"].get(

                str(hour),

                0

            )

            + EventResolver.risk(event)

        )

        self.db.update_time_profile(

            host,

            profile

        )

        return profile

    def get(
        self,
        hostname
    ):

        return self.db.get_time_profile(

            hostname

        )