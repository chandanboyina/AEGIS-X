from services.dashboard_service import DashboardService
from services.timeline_service import TimelineService


class TimelineAPI:

    def __init__(self):

        self.dashboard = DashboardService()

        self.timeline = TimelineService()

    def latest(self):

        packet = self.dashboard.latest_packet()

        return self.timeline.build(packet)