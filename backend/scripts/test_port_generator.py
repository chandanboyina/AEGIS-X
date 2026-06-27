from simulation.generators.port_generator import PortGenerator

print()

print("Single Port")

print("----------------")

print(
    PortGenerator.random_port()
)

print()

print("Port Scan")

print("----------------")

for port in PortGenerator.random_scan():

    print(port)