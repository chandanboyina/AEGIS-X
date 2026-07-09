from collectors.windows.windows_pipeline import WindowsPipeline

from agents.common.event_resolver import EventResolver

pipeline = WindowsPipeline()

windows = pipeline.run()

events = []

for collector in windows.values():

    events.extend(collector)

event = events[0]

print("=" * 60)
print("EVENT RESOLVER")
print("=" * 60)

print("User       :", EventResolver.username(event))
print("Host       :", EventResolver.hostname(event))
print("Process    :", EventResolver.process(event))
print("Collector  :", EventResolver.collector(event))
print("Risk       :", EventResolver.risk(event))
print("MITRE      :", EventResolver.mitre(event))
print("Source IP  :", EventResolver.source_ip(event))
print("Dest IP    :", EventResolver.destination_ip(event))