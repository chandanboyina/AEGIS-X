from pprint import pprint

from services.dashboard_service import DashboardService
from services.council_service import CouncilService

dashboard = DashboardService()
service = CouncilService()

packet = dashboard.latest_packet()

pprint(service.build(packet))