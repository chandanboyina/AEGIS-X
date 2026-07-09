from collections import defaultdict
from agents.ueba.behavior_database import BehaviorDatabase
from agents.common.event_resolver import EventResolver



class DeviceProfiler:
    """
    Enterprise Device Behavior Profiler.

    Learns normal behaviour for every endpoint.
    """

    def __init__(self):


        self.db = BehaviorDatabase()

    def update(self, event):

        hostname = EventResolver.hostname(event)

        profile = self.db.get_device(hostname)

        if profile is None:

            profile = {}

        profile.setdefault("events", 0)

        profile.setdefault("powershell", 0)

        profile.setdefault("dns", 0)

        profile.setdefault("security", 0)

        profile.setdefault("defender", 0)

        profile.setdefault("users", [])

        profile.setdefault("sources", [])

        profile.setdefault("mitre", [])

        profile.setdefault("risk", 0)

        profile["events"] += 1

        source = EventResolver.collector(event)

        if "powershell" in source:
            profile["powershell"] += 1

        elif "dns" in source:
            profile["dns"] += 1

        elif "security" in source:
            profile["security"] += 1

        elif "defender" in source:
            profile["defender"] += 1

        if source not in profile["sources"]:

            profile["sources"].append(source)


        #
        # Users
        #

        user = EventResolver.username(event)

        if user:

            user = user.lower()

            if user not in profile["users"]:

                profile["users"].append(user)

        #
        # MITRE
        #

        technique = EventResolver.mitre(event)

        if technique and technique != "Unknown":

            if (

                technique

                and

                technique != "Unknown"

                and

                technique not in profile["mitre"]

            ):

                profile["mitre"].append(technique)

        #
        # Risk
        #

        profile["risk"] += EventResolver.risk(event)

        #
        # Average Risk
        #

        profile["average_risk"] = round(
            profile["risk"] /
            max(profile["events"], 1),
            2
        )
        #
        # Save profile
        #

        self.db.update_device(

            hostname,

            profile

        )

        return profile

    def get(self, hostname):

        return self.db.get_device(hostname)