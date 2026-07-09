from collectors.defender.defender_collector import DefenderCollector
import pprint

collector = DefenderCollector()

events = collector.collect()

print("=" * 60)
print("WINDOWS DEFENDER COLLECTOR")
print("=" * 60)
print()

print("Collected :", len(events))
print()

if events:

    pprint.pp(events[0])

else:

    print("No Defender events found.")