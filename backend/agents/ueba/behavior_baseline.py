from agents.ueba.behavior_database import BehaviorDatabase
from agents.ueba.peer_group_profiler import PeerGroupProfiler


class BehaviorBaseline:
    """
    Enterprise UEBA Behavioral Baseline.

    Combines

    • User Profile
    • Host Profile
    • Process Profile

    into a single behavioral baseline.
    """

    def __init__(self):

        self.db = BehaviorDatabase()

        self.peer_profiler = PeerGroupProfiler()

    def build(self, event):

        #
        # Username
        #

        username = (

            event.get("user")

            or event.get("username")

            or "unknown"

        ).lower()

        #
        # Host
        #

        hostname = (

            event.get("hostname")

            or "unknown"

        )

        #
        # Process
        #

        process = (

            event.get("process")

            or event.get("image")

            or event.get("command")

            or event.get("event_name")

            or "unknown"

        ).lower()

        group = self.peer_profiler.group_name(event)

        return {

            "user": self.db.get_user(username),

            "host": self.db.get_host(hostname),

            "process": self.db.get_process(process),

            "device": self.db.get_device(hostname),

            "network": self.db.get_network(hostname),

            "time": self.db.get_time(hostname),

            "peer": self.db.get_peer_group(group)

        }