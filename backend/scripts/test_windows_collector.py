from collectors.windows_collector import WindowsCollector

collector = WindowsCollector(
    path="collectors/sample_logs/windows/windows.json"
)

events = collector.collect()

print("=" * 60)
print("WINDOWS COLLECTOR")
print("=" * 60)

print(f"Events : {len(events)}")
print()

print("Health")
print(collector.health())

print()

if events:

    print("First Event")
    print(events[0])