from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry

telemetry = EnterpriseTelemetry().collect()

print("=" * 60)
print("ENTERPRISE TELEMETRY")
print("=" * 60)
print()

windows = telemetry["windows"]

for source, events in windows.items():

    print(f"{source:15}: {len(events)}")