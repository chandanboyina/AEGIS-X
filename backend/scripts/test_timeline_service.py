from pprint import pprint

from services.dashboard_service import DashboardService
from services.timeline_service import TimelineService

dashboard = DashboardService()
service = TimelineService()

packet = dashboard.latest_packet()

pprint(service.build(packet))