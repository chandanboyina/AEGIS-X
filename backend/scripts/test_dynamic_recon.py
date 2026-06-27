from simulation.event_generator import EnterpriseEventGenerator

generator = EnterpriseEventGenerator()

print()

print("Dynamic Reconnaissance Events")

print("--------------------------------")

for i in range(10):

    print()

    print(f"Recon Event {i+1}")

    print(
        generator.generate_recon_event()
    )