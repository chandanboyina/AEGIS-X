from pprint import pprint

from simulation.enterprise_stream import EnterpriseEventStream

stream = EnterpriseEventStream()

events = stream.generate_stream()

print()

print("=" * 70)

print("ENTERPRISE EVENT STREAM")

print("=" * 70)

for i, event in enumerate(events, start=1):

    print()

    print(f"EVENT {i}")

    pprint(event)