from agents.ueba.behavior_database import BehaviorDatabase
from agents.common.event_resolver import EventResolver

class ProcessProfiler:
    """
    Enterprise Process Behavior Profiler.

    Learns normal process behaviour.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

    def update(self, event):

        #
        # Process name
        #

        process = EventResolver.process(event)

        profile = self.db.get_process(process)

        if profile is None:

            profile = {}

        #
        # Schema migration
        #

        profile.setdefault("events", 0)

        profile.setdefault("users", [])

        profile.setdefault("hosts", [])

        profile.setdefault("mitre", [])

        profile.setdefault("powershell", False)

        profile.setdefault("network", 0)

        profile.setdefault("dns", 0)

        #
        # Count
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
        # Host
        #

        host = EventResolver.hostname(event)

        if host and host not in profile["hosts"]:

            profile["hosts"].append(host)

        #
        # PowerShell
        #

        collector = EventResolver.collector(event)

        if "powershell" in collector:

            profile["powershell"] = True

        #
        # Network activity
        #

        if EventResolver.source_ip(event):

            profile["network"] += 1

        #
        # DNS
        #

        if "dns" in collector:

            profile["dns"] += 1

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

        self.db.update_process(

            process,

            profile

        )

        return profile