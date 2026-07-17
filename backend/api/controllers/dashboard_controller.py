from services.dashboard_service import DashboardService


class DashboardController:
    """
    Enterprise Dashboard Controller.

    Connects REST APIs to the
    Dashboard Service.
    """

    def __init__(self):

        self.dashboard = DashboardService()

    def latest(self):

        return self.dashboard.latest_packet()

    def summary(self):

        return self.dashboard.dashboard()

    def council(self):

        packet = self.dashboard.latest_packet()

        return packet["incident"]["council"]

    def brain(self):

        packet = self.dashboard.latest_packet()

        return packet["brain"]

    def dna(self):

        packet = self.dashboard.latest_packet()

        return packet["cyber_dna"]

    def twin(self):

        packet = self.dashboard.latest_packet()

        return packet["digital_twin"]

    def pipeline(self):

        packet = self.dashboard.latest_packet()

        return packet["pipeline"]

    def trace(self):

        packet = self.dashboard.latest_packet()

        return packet["trace"]