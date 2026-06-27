from ai.behavior.isolation_model import BehaviorIsolationModel

model = BehaviorIsolationModel()

# Fake training data
for _ in range(20):
    model.training_data.append(
        [1, 2, 3, 4, 5, 6]
    )

model.train()

history = model.get_training_history()

print()

print("Training History")

print("------------------------")

for item in history:

    print(item)