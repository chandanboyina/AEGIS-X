from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.current_activity_builder import CurrentActivityBuilder

pipeline = WindowsPipeline()

windows = pipeline.run()

events = []

for collector in windows.values():

    events.extend(

        collector

    )

print("Total events:", len(events))

builder = CurrentActivityBuilder()

snapshot = builder.build(events)

print("=" * 60)

print("CURRENT ACTIVITY")

print("=" * 60)

print()

print("Users")

print(snapshot["users"])

print()

print("Hosts")

print(snapshot["hosts"])

print()

print("Processes")

print(snapshot["processes"])

print(events[0])