from agents.ueba.behavior_database import BehaviorDatabase
from agents.common.event_resolver import EventResolver

class UserProfiler:
    """
    Enterprise User Behavior Profiler.

    Learns normal user activity over time.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

    def update(self, event):

        #
        # Username
        #

        username = EventResolver.username(event)

        #
        # Existing profile
        #

        profile = self.db.get_user(username)

        if profile is None:

            profile = {}

        #
        # Schema migration
        #

        profile.setdefault("events", 0)

        profile.setdefault("powershell", 0)

        profile.setdefault("dns", 0)

        profile.setdefault("security", 0)

        profile.setdefault("defender", 0)

        profile.setdefault("hosts", [])

        profile.setdefault("mitre", [])

        #
        # Event count
        #

        profile["events"] += 1

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
        # Host
        #

        host = EventResolver.hostname(event)

        if (

            host

            and

            host not in profile["hosts"]

        ):

            profile["hosts"].append(host)

        #
        # MITRE
        #

        mitre = EventResolver.mitre(event)

        if (

            mitre

            and

            mitre != "Unknown"

            and

            mitre not in profile["mitre"]

        ):

            profile["mitre"].append(

                mitre

            )

        #
        # Save
        #

        self.db.update_user(

            username,

            profile

        )

        return profile