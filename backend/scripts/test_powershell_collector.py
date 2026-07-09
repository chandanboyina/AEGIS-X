from collectors.powershell.powershell_collector import PowerShellCollector
import pprint

collector = PowerShellCollector()

events = collector.collect()

print("=" * 60)
print("POWERSHELL COLLECTOR")
print("=" * 60)
print()

print("Collected :", len(events))
print()

if events:

    pprint.pp(events[0])

else:

    print("No PowerShell events found.")