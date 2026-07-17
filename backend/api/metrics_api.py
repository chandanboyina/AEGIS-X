from services.dashboard_service import DashboardService
from services.metrics_service import MetricsService


class MetricsAPI:

    def __init__(self):

        self.dashboard = DashboardService()

        self.metrics = MetricsService()

    def latest(self):

        packet = self.dashboard.latest_packet()

        return self.metrics.build(packet)