from collectors.security.security_collector import SecurityCollector
from collectors.security.security_features import SecurityFeatures

collector = SecurityCollector()
features = SecurityFeatures()

events = collector.collect()

print("=" * 60)
print("SECURITY FEATURES")
print("=" * 60)
print()

if events:

    f = features.extract(events[0])

    for k, v in f.items():

        print(f"{k:22}: {v}")

else:

    print("No events.")