from simulation.enterprise_pipeline import EnterprisePipeline


pipeline = EnterprisePipeline()

packets = list(
    pipeline.run_live()
)

stats = pipeline.generate_statistics(
    packets
)

print("\n")
print("=" * 80)
print("AEGIS-X ENTERPRISE SECURITY DASHBOARD")
print("=" * 80)

print(f"\nTotal Events           : {stats['total_events']}")

print("\nObserver Decisions")
print("-" * 40)

for decision, count in stats["decisions"].items():
    print(f"{decision:<15}: {count}")

print("\nPriority Distribution")
print("-" * 40)



for sev, count in stats["severity"].items():
    print(f"{sev:<15}: {count}")

print("\nSeverity Distribution")
print("-" * 40)

for priority, count in stats["priorities"].items():
    print(f"{priority:<15}: {count}")

print("\nThreat Categories")
print("-" * 40)

for category, count in stats["categories"].items():
    print(f"{category:<20}: {count}")

print("\nTop Targeted Assets")
print("-" * 40)

for asset, count in stats["assets"].items():
    print(f"{asset:<20}: {count}")

print("\nAverage Observer Confidence")
print("-" * 40)

print(f"{stats['average_confidence']} %")

print("\n")
print("=" * 80)
print("ENTERPRISE SECURITY SUMMARY")
print("=" * 80)

print(f"\nSecurity Score          : {stats['security_score']}/100")


overall = (
    "ELEVATED RISK"
    if stats["alert_rate"] >= 30
    else "NORMAL"
)

if stats["security_score"] >= 90:
    status = "SECURE"

elif stats["security_score"] >= 75:
    status = "LOW RISK"

elif stats["security_score"] >= 55:
    status = "ELEVATED RISK"

elif stats["security_score"] >= 35:
    status = "HIGH RISK"

else:
    status = "CRITICAL"

print(f"\nOverall Security Status : {status}")

#print(f"\nOverall Security Status : {overall}")

print(f"Events Processed        : {stats['total_events']}")
print(f"Alerts Generated        : {stats['decisions'].get('ALERT',0)}")
print(f"Alert Rate              : {stats['alert_rate']} %")
print(f"Attack Rate             : {stats['attack_rate']} %")

print(f"\nHighest Targeted Asset  : {stats['highest_target']}")
print(f"Most Common Threat      : {stats['most_common_threat']}")

print(f"\nCritical Incidents      : {stats['critical_incidents']}")
print(f"High Incidents          : {stats['high_incidents']}")

print("\nRecommended Actions")
print("-" * 30)

if stats["critical_incidents"] > 0:
    print("• Immediately investigate all CRITICAL incidents.")

if stats["most_common_threat"] != "Normal":
    print(f"• Review all {stats['most_common_threat']} events.")

print(f"• Monitor asset {stats['highest_target']} for further activity.")