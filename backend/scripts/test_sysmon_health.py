from collectors.sysmon.sysmon_collector import SysmonCollector

collector = SysmonCollector()

print("=" * 60)
print("SYSMON HEALTH")
print("=" * 60)
print()

print(collector.health())