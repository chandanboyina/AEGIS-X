from agents.ueba.user_profiler import UserProfiler
from agents.ueba.host_profiler import HostProfiler
from agents.ueba.process_profiler import ProcessProfiler
from agents.ueba.device_profiler import DeviceProfiler
from agents.ueba.network_profiler import NetworkProfiler
from agents.ueba.time_profiler import TimeProfiler
from agents.ueba.peer_group_profiler import PeerGroupProfiler

class BehaviorTrainer:
    """
    Enterprise Behavior Trainer.

    Trains every behavioral profiler
    using normalized enterprise events.
    """

    def __init__(self):

        self.user = UserProfiler()

        self.host = HostProfiler()

        self.process = ProcessProfiler()

        self.device = DeviceProfiler()

        self.network = NetworkProfiler()

        self.time = TimeProfiler()

        self.peer = PeerGroupProfiler()
    
    def train(self, events):

        trained = 0

        for event in events:

            self.user.update(event)

            self.host.update(event)

            self.process.update(event)

            self.device.update(event)

            self.network.update(event)

            self.time.update(event)

            self.peer.update(event)

            trained += 1

        return {

            "trained_events": trained,

            "status": "Completed"

        }