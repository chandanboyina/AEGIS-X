from services.dashboard_service import DashboardService


class PredictionAPI:

    def __init__(self):

        self.dashboard = DashboardService()

    def latest(self):

        packet = self.dashboard.latest_packet()

        return packet["incident"]["commander"]["forecast"]