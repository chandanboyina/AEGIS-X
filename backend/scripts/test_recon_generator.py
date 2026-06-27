from simulation.event_generator import EnterpriseEventGenerator

generator = EnterpriseEventGenerator()

print()

print("Reconnaissance Event Generator")

print("------------------------------")

for i in range(10):

    event = generator.reconnaissance_event()

    print()

    print(f"Recon Event {i+1}")

    print(event)