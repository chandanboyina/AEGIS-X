from collectors.defender.defender_collector import DefenderCollector
from collectors.defender.defender_parser import DefenderParser

collector = DefenderCollector()

parser = DefenderParser()

events = collector.collect()

print("=" * 60)
print("WINDOWS DEFENDER PARSER")
print("=" * 60)
print()

if events:

    parsed = parser.parse(events[0])

    for key, value in parsed.items():

        print(f"{key:18}: {value}")

else:

    print("No Defender events.")