from collectors.dns.dns_collector import DNSCollector
from collectors.dns.dns_parser import DNSParser

collector = DNSCollector()

parser = DNSParser()

events = collector.collect()

print("=" * 60)
print("DNS PARSER")
print("=" * 60)
print()

if events:

    parsed = parser.parse(events[0])

    for k, v in parsed.items():

        print(f"{k:18}: {v}")

else:

    print("No DNS events")