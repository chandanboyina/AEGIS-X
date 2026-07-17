from services.dashboard_service import DashboardService
from services.council_service import CouncilService


class CouncilAPI:

    def __init__(self):

        self.dashboard = DashboardService()

        self.service = CouncilService()

    def latest(self):

        packet = self.dashboard.latest_packet()

        return self.service.build(packet)