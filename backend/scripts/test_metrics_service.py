from pprint import pprint

from services.dashboard_service import DashboardService
from services.metrics_service import MetricsService

dashboard = DashboardService()
service = MetricsService()

packet = dashboard.latest_packet()

pprint(service.build(packet))