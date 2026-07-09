from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry

from agents.correlation.telemetry_correlator import TelemetryCorrelator
from agents.correlation.event_grouper import EventGrouper
from agents.correlation.timeline_builder import TimelineBuilder
from agents.correlation.attack_session_builder import AttackSessionBuilder
from agents.correlation.attack_chain_builder import AttackChainBuilder
from agents.correlation.packet_builder import PacketBuilder

from agents.incident_manager.incident_manager import IncidentManager


print("=" * 70)
print("END TO END INCIDENT PIPELINE")
print("=" * 70)
print()

#
# Enterprise Telemetry
#

telemetry = EnterpriseTelemetry().collect()

#
# Correlation
#

incidents = TelemetryCorrelator().correlate(
    telemetry
)

groups = EventGrouper().group(
    incidents
)

timelines = TimelineBuilder().build(
    groups
)

sessions = AttackSessionBuilder().build(
    timelines
)

chains = AttackChainBuilder().build(
    sessions
)

#
# Enterprise Incident Manager
#

builder = PacketBuilder()

manager = IncidentManager()

print("Attack Chains :", len(chains))
print()

#
# Test only first incident
#

packet = builder.build(
    chains[0]
)

result = manager.create(
    packet
)

incident = result["incident"]

print("=" * 70)
print("INCIDENT CREATED")
print("=" * 70)
print()

print("Incident ID :", incident["incident_id"])
print("Host        :", incident["asset"]["hostname"])
print("Status      :", incident["status"])
print("Severity    :", incident["severity"])
print("Category    :", incident["category"])
print("Team        :", incident["assigned_team"])
print("Owner       :", incident["assigned_owner"])
print("Risk        :", packet["sentinel"]["risk"])
print("Confidence  :", packet["observer"]["confidence"])