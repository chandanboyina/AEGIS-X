from agents.correlation.attack_session_builder import AttackSessionBuilder
from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry

from agents.correlation.telemetry_correlator import TelemetryCorrelator

from agents.correlation.event_grouper import EventGrouper

from agents.correlation.timeline_builder import TimelineBuilder

from agents.correlation.attack_chain_builder import AttackChainBuilder


telemetry = EnterpriseTelemetry().collect()

events = TelemetryCorrelator().correlate(

    telemetry

)

groups = EventGrouper().group(

    events

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

print("=" * 60)

print("ATTACK CHAIN BUILDER")

print("=" * 60)

print()

print("Attack Chains :", len(chains))

print()

for chain in chains[:5]:

    print("Host :", chain["host"])

    print("Events :", chain["events"])

    print("Timelines :", chain["timelines"])

    print("Risk :", chain["risk"])

    print("Confidence :", chain["confidence"])

    print("Severity :", chain["severity"])

    print("Categories :", chain["categories"])

    print()

    print("Attack Chain")

    print(" -> ".join(

        chain["attack_chain"]

    ))

    print()

    print("MITRE")

    print(chain["mitre"])

    print("-"*70)