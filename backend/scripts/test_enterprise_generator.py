from simulation.event_generator import EnterpriseEventGenerator

generator = EnterpriseEventGenerator()

print()

print("Enterprise Normal Events")

print("--------------------------")

for i in range(10):

    print()

    event = generator.generate_normal_event()

    print(event)