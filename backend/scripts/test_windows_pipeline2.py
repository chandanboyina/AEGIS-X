from collectors.windows.windows_pipeline import WindowsPipeline

pipeline = WindowsPipeline()

telemetry = pipeline.run()

print("=" * 60)
print("WINDOWS PIPELINE")
print("=" * 60)
print()

for source, events in telemetry.items():

    print(f"{source:15}: {len(events)}")