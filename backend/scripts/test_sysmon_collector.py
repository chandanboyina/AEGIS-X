from collectors.sysmon.sysmon_collector import SysmonCollector
from collectors.sysmon.sysmon_parser import SysmonParser

collector = SysmonCollector()
parser = SysmonParser()

events = collector.collect()

print("=" * 60)
print("SYSMON PARSER")
print("=" * 60)
print()

if events:

    parsed = parser.parse(events[0])

    for key, value in parsed.items():

        print(f"{key:15}: {value}")

else:

    print("No Sysmon events found.")