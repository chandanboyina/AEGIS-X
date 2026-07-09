from agents.ueba.behavior_database import BehaviorDatabase
from agents.ueba.behavior_reasoner import BehaviorReasoner
from datetime import datetime
from agents.common.event_resolver import EventResolver
from agents.ueba.current_activity_builder import CurrentActivityBuilder

class AIBehaviorEngine:
    """
    Enterprise AI Behavioral Analysis Engine.

    Compares current events against learned
    behavioral baselines.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

        self.reasoner = BehaviorReasoner()

    def analyze(self, event, snapshot=None):

        if snapshot is None:

            builder = CurrentActivityBuilder()

            snapshot = builder.build([event])

        user = self.user_behavior(event, snapshot)

        host = self.host_behavior(event, snapshot)

        process = self.process_behavior(event, snapshot)

        device = self.device_behavior(event, snapshot)

        network = self.network_behavior(event, snapshot)

        time = self.time_behavior(event, snapshot)

        peer = self.peer_behavior(event, snapshot)

        behavior_score = round(

            (

                user["risk"]

                + host["risk"]

                + process["risk"]

                + device["risk"]

                + network["risk"]

                + time["risk"]

                + peer["risk"]

            )

            /

            7

        )

        reasoning = [

            user["reason"],

            host["reason"],

            process["reason"],

            device["reason"],

            network["reason"],

            time["reason"],

            peer["reason"]

        ]

        return {

            "behavior_score": behavior_score,

            "behavior_status": (

                "Normal"

                if behavior_score < 30

                else

                "Suspicious"

                if behavior_score < 60

                else

                "Critical"

            ),

            "user": user,

            "host": host,

            "process": process,

            "device": device,

            "network": network,

            "time": time,

            "peer_group": peer,

            "reasoning": reasoning

        }
    
    def user_behavior(self, event, snapshot):

        username = EventResolver.username(event)

        profile = self.db.get_user(username)

        if profile is None:

            return {

                "known": False,

                "behavior": "Unknown",

                "risk": 80,

                "confidence": 95,

                "reason": "User has no learned baseline."

            }

        #
        # Current observation
        #

        current = snapshot["users"].get(

            username,

            {}

        ).get(

            "events",

            0

        )

        expected = max(

            profile["events"],

            1

        )


        result = self.reasoner.analyze(

            "User",

            current,

            expected

        )

        result["known"] = True

        result["user"] = username

        return result
    
    def host_behavior(self, event, snapshot):

        hostname = EventResolver.hostname(event)

        profile = self.db.get_host(hostname)

        if profile is None:

            return {

                "known": False,

                "behavior": "Unknown",

                "risk": 80,

                "confidence": 95,

                "reason": "Host has no learned baseline."

            }

        current = snapshot["hosts"].get(
            hostname,
            {}
        ).get(
            "events",
            0
        )

        expected = max(

            profile["events"],

            1

        )

        result = self.reasoner.analyze(

            "Host",

            current,

            expected

        )

        result["known"] = True

        result["hostname"] = hostname

        return result
    
    def process_behavior(self, event, snapshot):

        process = EventResolver.process(event)

        profile = self.db.get_process(process)

        if profile is None:

            return {

                "known": False,

                "behavior": "Unknown",

                "risk": 85,

                "confidence": 95,

                "reason": "Process never seen before."

            }

        current = snapshot["processes"].get(
            process,
            0
        )

        expected = max(

            profile["events"],

            1

        )

        result = self.reasoner.analyze(

            "Process",

            current,

            expected

        )

        result["known"] = True

        result["process"] = process

        return result
    
    def device_behavior(self, event, snapshot):

        hostname = EventResolver.hostname(event)

        profile = self.db.get_device(hostname)

        if profile is None:

            return {

                "known": False,

                "behavior": "Unknown",

                "risk": 75,

                "confidence": 95,

                "reason": "Device not found."

            }

        host_snapshot = snapshot["hosts"].get(
            hostname,
            {}
        )

        events = max(
            host_snapshot.get("events", 1),
            1
        )

        current = (
            host_snapshot.get("risk", 0)
            / events
        )

        expected = max(

            profile["average_risk"],

            1

        )

        result = self.reasoner.analyze(

            "Device",

            current,

            expected

        )

        result["known"] = True

        result["hostname"] = hostname

        return result
    
    def network_behavior(self, event, snapshot):

        hostname = EventResolver.hostname(event)

        profile = self.db.get_network(hostname)

        if profile is None:

            return {

                "known": False,

                "behavior": "Unknown",

                "risk": 75,

                "confidence": 95,

                "reason": "Network baseline unavailable."

            }

        network_profile = self.db.get_network(hostname)

        if network_profile is None:

            current = 0

        else:

            current = (

                network_profile.get(
                    "dns_queries",
                    0
                )

                +

                network_profile.get(
                    "powershell_network",
                    0
                )

            )

        expected = max(

            profile["connections"],

            1

        )

        result = self.reasoner.analyze(

            "Network",

            current,

            expected

        )

        result["known"] = True

        result["hostname"] = hostname

        return result
    

    


    def time_behavior(self, event, snapshot):

        hostname = EventResolver.hostname(event)

        profile = self.db.get_time_profile(hostname)

        if profile is None:

            return {

                "known": False,

                "behavior": "Unknown",

                "risk": 70,

                "confidence": 95,

                "reason": "No temporal baseline."

            }

        timestamp = EventResolver.timestamp(event)

        hour = 0

        if timestamp:

            try:

                hour = datetime.fromisoformat(

                    timestamp.replace(

                        "Z",

                        "+00:00"

                    )

                ).hour

            except Exception:

                pass

        current = profile["hours"].get(
            str(hour),
            0
        )

        expected = profile["hours"].get(

            str(hour),

            0

        )

        expected = max(

            expected,

            1

        )

        result = self.reasoner.analyze(

            "Time",

            current,

            expected

        )

        result["known"] = True

        result["hour"] = hour

        return result
    
    def peer_behavior(self, event, snapshot):

        group = "Workstations"

        hostname = EventResolver.hostname(event)

        if "server" in hostname:

            group = "Servers"

        elif "dc" in hostname:

            group = "Domain Controllers"

        profile = self.db.get_peer_group(group)

        if profile is None:

            return {

                "known": False,

                "behavior": "Unknown",

                "risk": 75,

                "confidence": 95,

                "reason": "Peer baseline unavailable."

            }

        host_snapshot = snapshot["hosts"].get(

            EventResolver.hostname(event),

            {}

        )

        current = host_snapshot.get(

            "events",

            0

        )

        expected = max(

            profile["events"],

            1

        )

        result = self.reasoner.analyze(

            "Peer Group",

            current,

            expected

        )

        result["known"] = True

        result["group"] = group

        return result