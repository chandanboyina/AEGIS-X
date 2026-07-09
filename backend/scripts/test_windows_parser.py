from collectors.parsers.windows_parser import WindowsParser

parser = WindowsParser()

event = {

    "timestamp": "2026-07-05",

    "asset": "DC-01",

    "user": "Administrator",

    "source_ip": "10.0.0.15",

    "destination_ip": "10.0.0.1",

    "event": "Unknown",

    "event_id": 4625,

    "severity": "INFO"

}

parsed = parser.parse(event)

print("=" * 60)
print("WINDOWS PARSER")
print("=" * 60)

for k, v in parsed.items():
    print(f"{k:<18}: {v}")
    