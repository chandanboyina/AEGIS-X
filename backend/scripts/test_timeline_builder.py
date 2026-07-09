from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry

from agents.correlation.telemetry_correlator import TelemetryCorrelator

from agents.correlation.event_grouper import EventGrouper

from agents.correlation.timeline_builder import TimelineBuilder


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

print("=" * 60)

print("TIMELINE BUILDER")

print("=" * 60)

print()

print("Timelines :", len(timelines))

print()

#
# Show first five timelines
#

for timeline in timelines[:5]:

    print("Group :", timeline["group"])

    print("Events :", timeline["event_count"])

    print()

    for event in timeline["events"][:3]:

        print(

            event["source"],

            event["event"]["timestamp"]

        )

    print("-" * 60)