from collectors.security.security_event_reader import SecurityEventReader

reader = SecurityEventReader()

events = reader.read()

print("="*60)
print("WINDOWS SECURITY READER")
print("="*60)
print()

print("Collected:", len(events))
print()

if events:
    print(events[0])