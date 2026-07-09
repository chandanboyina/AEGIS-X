from collections import defaultdict
from agents.ueba.behavior_database import BehaviorDatabase
from agents.common.event_resolver import EventResolver

class PeerGroupProfiler:
    """
    Enterprise Peer Group Behavior Profiler.

    Learns behavioral baselines for
    groups of similar users/devices.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

    def group_name(self, event):

        #
        # Simple grouping.
        # Later:
        # AD OU
        # Department
        # Business Unit
        #

        hostname = EventResolver.hostname(event).lower()

        if "server" in hostname:

            return "Servers"

        if "dc" in hostname:

            return "Domain Controllers"

        return "Workstations"

    def update(self, event):

        group = self.group_name(event)

        profile = self.db.get_peer_group(group)

        if profile is None:

            profile = {}

        profile.setdefault("events", 0)

        profile.setdefault("powershell", 0)

        profile.setdefault("dns", 0)

        profile.setdefault("security", 0)

        profile.setdefault("risk", 0)

        profile.setdefault("average_risk", 0)

        profile.setdefault("users", [])

        profile.setdefault("hosts", [])

        profile.setdefault("mitre", [])

        profile["events"] += 1

        collector = EventResolver.collector(event)

        if "powershell" in collector:

            profile["powershell"] += 1

        elif "dns" in collector:

            profile["dns"] += 1

        elif "security" in collector:

            profile["security"] += 1

        profile["risk"] += EventResolver.risk(event)

        profile["average_risk"] = round(

            profile["risk"]

            /

            max(

                profile["events"],

                1

            ),

            2

        )

        user = EventResolver.username(event)

        if user:

            user = user.lower()

            if user not in profile["users"]:

                profile["users"].append(user)

        host = EventResolver.hostname(event)

        if host not in profile["hosts"]:

            profile["hosts"].append(host)

        technique = EventResolver.mitre(event)

        if (

            technique

            and

            technique != "Unknown"

        ):

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

        self.db.update_peer_group(

            group,

            profile

        )

        return profile

    def get(
        self,
        group
    ):

        return self.db.get_peer_group(

            group

    )