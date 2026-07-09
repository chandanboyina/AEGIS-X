from collectors.normalizer import LogNormalizer

event = {

    "timestamp": "2026-07-03",

    "asset": "DC-01",

    "user": "Administrator",

    "source_ip": "10.0.0.15",

    "destination_ip": "10.0.0.1",

    "event": "Failed Logon",

    "event_id": 4625,

    "severity": "HIGH"

}

normalizer = LogNormalizer()

normalized = normalizer.normalize(

    event,

    collector="Windows"

)

print("=" * 60)
print("NORMALIZED EVENT")
print("=" * 60)

for k, v in normalized.items():

    print(f"{k:20}: {v}")