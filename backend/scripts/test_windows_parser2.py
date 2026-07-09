from collectors.windows.windows_collector import WindowsCollector
from collectors.windows.windows_parser import WindowsParser

collector = WindowsCollector()

parser = WindowsParser()

telemetry = collector.collect()

parsed = parser.parse(telemetry)

print("=" * 60)
print("WINDOWS PARSER")
print("=" * 60)
print()

for source, events in parsed.items():

    print(f"{source:15}: {len(events)}")