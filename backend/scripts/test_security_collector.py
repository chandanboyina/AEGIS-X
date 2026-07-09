from pprint import pprint

from collectors.security.security_collector import SecurityCollector

collector = SecurityCollector()

events = collector.collect()

print("=" * 60)
print("WINDOWS SECURITY COLLECTOR")
print("=" * 60)
print()

print("Collected :", len(events))
print()

if events:

    pprint(events[0])

else:

    print("No events.")