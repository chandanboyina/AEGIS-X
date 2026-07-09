from collections import defaultdict
from agents.ueba.behavior_database import BehaviorDatabase
from agents.common.event_resolver import EventResolver
    

class NetworkProfiler:
    """
    Enterprise Network Behavior Profiler.

    Learns normal communication
    patterns across the enterprise.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

        self.db = BehaviorDatabase()

    def update(self, event):

        host = EventResolver.hostname(event)

        profile = self.db.get_network(host)

        if profile is None:

            profile = {}

        profile.setdefault("connections", 0)

        profile.setdefault("source_ips", [])

        profile.setdefault("destination_ips", [])

        profile.setdefault("ports", {})

        profile.setdefault("protocols", {})

        profile.setdefault("dns_queries", 0)

        profile.setdefault("powershell_network", 0)

        profile.setdefault("risk", 0)

        profile.setdefault("average_risk", 0)

        profile.setdefault("mitre", [])

        profile["connections"] += 1

        #
        # IPs
        #

        sip = EventResolver.source_ip(event)

        dip = EventResolver.destination_ip(event)

        if (

            sip

            and

            sip not in profile["source_ips"]

        ):

            profile["source_ips"].append(sip)

        if (

            dip

            and

            dip not in profile["destination_ips"]

        ):

            profile["destination_ips"].append(dip)

        #
        # Ports
        #

        ports = event.get("ports", [])

        for port in ports:

            profile["ports"][port] = (

                profile["ports"].get(

                    port,

                    0

                )

                + 1

            )

        #
        # Collector
        #

        collector = EventResolver.collector(event)

        if "dns" in collector:

            profile["dns_queries"] += 1

        if "powershell" in collector:

            profile["powershell_network"] += 1

        #
        # Protocol
        #

        protocol = event.get(

            "protocol"

        )

        if protocol:

            proto = protocol.upper()

            profile["protocols"][proto] = (

                profile["protocols"].get(

                    proto,

                    0

                )

                + 1

            )

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

        profile["risk"] += EventResolver.risk(event)
        
        profile["average_risk"] = round(

            profile["risk"]

            /

            max(

                profile["connections"],

                1

            ),

            2

        )

        self.db.update_network(

            host,

            profile

        )

        return profile

    def get(
        self,
        hostname
    ):

        return self.db.get_network(

            hostname

        )