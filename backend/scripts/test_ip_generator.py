from simulation.generators.ip_generator import IPGenerator

print()

print("External IPs")

print("----------------")

for _ in range(5):

    print(IPGenerator.external())

print()

print("Internal IPs")

print("----------------")

for _ in range(5):

    print(IPGenerator.internal())