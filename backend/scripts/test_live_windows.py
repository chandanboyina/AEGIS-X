from collectors.windows_collector import WindowsCollector

collector = WindowsCollector(

    live=True,

    log_types=[

        "Application",

        "System",

        "Security",

        "Microsoft-Windows-Sysmon/Operational",

        "Microsoft-Windows-Windows Defender/Operational",

        "Microsoft-Windows-PowerShell/Operational",

        "Microsoft-Windows-DNS-Server/Analytical",

        "Microsoft-Windows-TerminalServices-LocalSessionManager/Operational"

    ]

)

events = collector.collect()

print("="*70)

print("LIVE WINDOWS EVENTS")

print("="*70)

print()

print(f"Collected : {len(events)}")

print()

for event in events[:10]:

    print(event)