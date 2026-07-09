from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.current_activity_builder import CurrentActivityBuilder
from agents.ueba.ai_behavior_engine import AIBehaviorEngine
from agents.ueba.behavior_features import BehaviorFeatures

pipeline = WindowsPipeline()

windows = pipeline.run()

events = []

for collector in windows.values():

    events.extend(collector)

builder = CurrentActivityBuilder()

snapshot = builder.build(events)

engine = AIBehaviorEngine()

result = engine.analyze(

    events[0],

    snapshot

)

features = BehaviorFeatures.build(result)

print("=" * 60)
print("BEHAVIOR FEATURES")
print("=" * 60)

for k, v in features.items():

    print(k, ":", v)