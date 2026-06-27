from ai.behavior.isolation_model import BehaviorIsolationModel

model = BehaviorIsolationModel()

print("Before Training")
print(model.metrics())

model.trained = True

for _ in range(20):
    model.training_data.append([1, 2, 3, 4, 5, 6])

print()

print("After Training")
print(model.metrics())