from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry

from agents.correlation.telemetry_correlator import TelemetryCorrelator
from agents.correlation.event_grouper import EventGrouper
from agents.correlation.timeline_builder import TimelineBuilder
from agents.correlation.attack_session_builder import AttackSessionBuilder
from agents.correlation.attack_chain_builder import AttackChainBuilder
from agents.correlation.packet_builder import PacketBuilder

print("=" * 70)
print("PACKET BUILDER")
print("=" * 70)
print()

telemetry = EnterpriseTelemetry().collect()

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

builder = PacketBuilder()

packet = builder.build(
    chains[0]
)

for key, value in packet.items():

    print(f"{key:12}: {value}")