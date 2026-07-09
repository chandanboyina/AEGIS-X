from agents.ueba.behavior_database import BehaviorDatabase
from agents.common.event_resolver import EventResolver

class HostProfiler:
    """
    Enterprise Host Behavior Profiler.

    Learns normal host behavior.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

    def update(self, event):

        hostname = EventResolver.hostname(event)

        profile = self.db.get_host(hostname)

        if profile is None:

            profile = {}

        #
        # Schema migration
        #

        profile.setdefault("events", 0)

        profile.setdefault("users", [])

        profile.setdefault("powershell", 0)

        profile.setdefault("dns", 0)

        profile.setdefault("security", 0)

        profile.setdefault("defender", 0)

        profile.setdefault("mitre", [])

        #
        # Total events
        #

        profile["events"] += 1

        #
        # User
        #

        user = EventResolver.username(event)

        if user:

            user = user.lower()

            if user not in profile["users"]:

                profile["users"].append(user)

        #
        # Collector
        #

        collector = EventResolver.collector(event)

        if "powershell" in collector:

            profile["powershell"] += 1

        elif "dns" in collector:

            profile["dns"] += 1

        elif "security" in collector:

            profile["security"] += 1

        elif "defender" in collector:

            profile["defender"] += 1

        #
        # MITRE
        #

        technique = EventResolver.mitre(event)

        if (

            technique

            and

            technique != "Unknown"

            and

            technique not in profile["mitre"]

        ):

            profile["mitre"].append(

                technique

            )

        self.db.update_host(

            hostname,

            profile

        )

        return profile