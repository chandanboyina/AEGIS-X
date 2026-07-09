from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.behavior_trainer import BehaviorTrainer

pipeline = WindowsPipeline()

windows = pipeline.run()

events = []

for collector in windows.values():

    events.extend(collector)

trainer = BehaviorTrainer()

result = trainer.train(events)

print("=" * 60)
print("BEHAVIOR TRAINER")
print("=" * 60)

print(result)