from simulation.generators.user_generator import UserGenerator

print()

print("Enterprise Users")

print("----------------------")

for _ in range(10):

    print(
        UserGenerator.random_user()
    )