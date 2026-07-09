from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry

from agents.correlation.telemetry_correlator import TelemetryCorrelator

from agents.correlation.event_grouper import EventGrouper

from agents.correlation.timeline_builder import TimelineBuilder

from agents.correlation.attack_session_builder import AttackSessionBuilder


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

print("=" * 70)

print("ATTACK SESSION BUILDER")

print("=" * 70)

print()

print("Sessions :", len(sessions))

print()

for session in sessions[:5]:

    print("Host :", session["host"])

    print(

        "Timeline Count :",

        len(session["timelines"])

    )

    print(

        "Buckets :",

        session["start_bucket"],

        "->",

        session["end_bucket"]

    )

    print("-" * 70)