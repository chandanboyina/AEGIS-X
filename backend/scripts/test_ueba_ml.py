from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.ueba_engine import UEBAEngine

pipeline = WindowsPipeline()

windows = pipeline.run()

event = windows["powershell"][0]

ueba = UEBAEngine()

result = ueba.analyze(event)

print("=" * 60)
print("UEBA ML")
print("=" * 60)

for k, v in result.items():

    print(k, ":", v)