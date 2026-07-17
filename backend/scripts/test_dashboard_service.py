from pprint import pprint

from services.dashboard_service import DashboardService

service = DashboardService()

dashboard = service.dashboard()

pprint(dashboard)