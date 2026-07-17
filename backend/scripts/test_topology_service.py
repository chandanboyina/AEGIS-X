from pprint import pprint

from services.dashboard_service import DashboardService
from services.topology_service import TopologyService

dashboard = DashboardService()
service = TopologyService()

packet = dashboard.latest_packet()

pprint(service.build(packet))