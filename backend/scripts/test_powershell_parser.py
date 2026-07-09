from collectors.powershell.powershell_collector import PowerShellCollector
from collectors.powershell.powershell_parser import PowerShellParser

collector = PowerShellCollector()
parser = PowerShellParser()

events = collector.collect()

print("=" * 60)
print("POWERSHELL PARSER")
print("=" * 60)
print()

if events:

    parsed = parser.parse(events[0])

    for key, value in parsed.items():

        print(f"{key:18}: {value}")

else:

    print("No PowerShell events found.")