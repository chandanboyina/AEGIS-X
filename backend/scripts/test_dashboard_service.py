from services.dashboard_service import DashboardService

service = DashboardService()

packet = service.latest_packet()

print(packet.keys())

print()

print(packet["pipeline"])

print()

print(packet["trace"])

print()

print(packet["incident"]["incident_id"])