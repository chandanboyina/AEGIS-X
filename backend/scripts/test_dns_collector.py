from collectors.dns.dns_collector import DNSCollector

collector = DNSCollector()

events = collector.collect()

print("=" * 60)
print("DNS COLLECTOR")
print("=" * 60)
print()

print("Collected :", len(events))

if events:

    print()

    print(events[0])