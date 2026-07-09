from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.ai_behavior_engine import AIBehaviorEngine

from agents.ueba.current_activity_builder import CurrentActivityBuilder

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

print("=" * 60)
print("AI BEHAVIOR ENGINE")
print("=" * 60)

for section, value in result.items():

    print(section)

    print(value)

    print("-" * 40)