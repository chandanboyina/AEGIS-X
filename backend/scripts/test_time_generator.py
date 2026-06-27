from simulation.generators.time_generator import TimeGenerator

print()

print("Random Times")

print("----------------")

for _ in range(5):
    print(TimeGenerator.random_time())

print()

print("Business Hours")

print("----------------")

for _ in range(5):
    print(TimeGenerator.business_hours())

print()

print("Night Hours")

print("----------------")

for _ in range(5):
    print(TimeGenerator.night_hours())