from collectors.security.security_collector import SecurityCollector
from collectors.security.security_parser import SecurityParser

collector = SecurityCollector()

parser = SecurityParser()

events = collector.collect()

print("=" * 60)
print("WINDOWS SECURITY PARSER")
print("=" * 60)
print()

if events:

    parsed = parser.parse(events[0])

    for key, value in parsed.items():

        print(f"{key:20}: {value}")

else:

    print("No Security events found.")