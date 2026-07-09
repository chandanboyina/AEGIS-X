from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry
from agents.correlation.telemetry_correlator import TelemetryCorrelator
from agents.correlation.event_grouper import EventGrouper

telemetry = EnterpriseTelemetry().collect()

events = TelemetryCorrelator().correlate(

    telemetry

)

groups = EventGrouper().group(

    events

)

print("="*60)
print("EVENT GROUPER")
print("="*60)
print()

print("Groups :", len(groups))
print()

for key, value in list(groups.items())[:10]:

    print(key, len(value))