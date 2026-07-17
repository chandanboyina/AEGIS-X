from services.dashboard_service import DashboardService
from services.topology_service import TopologyService


class TopologyAPI:

    def __init__(self):

        self.dashboard = DashboardService()

        self.topology = TopologyService()

    def latest(self):

        packet = self.dashboard.latest_packet()

        return self.topology.build(packet)