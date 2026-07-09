from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.device_profiler import DeviceProfiler


pipeline = WindowsPipeline()

windows = pipeline.run()

profiler = DeviceProfiler()

for collector in windows.values():

    for event in collector:

        profiler.update(event)

print("=" * 60)
print("DEVICE PROFILE")
print("=" * 60)
print()

for hostname in profiler.devices:

    print(hostname)

    print(

        profiler.get(hostname)

    )

    print("-" * 60)