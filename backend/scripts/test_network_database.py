from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.network_profiler import NetworkProfiler

pipeline = WindowsPipeline()

windows = pipeline.run()

profiler = NetworkProfiler()

for collector in windows.values():

    for event in collector:

        profiler.update(event)

print("=" * 60)
print("NETWORK DATABASE")
print("=" * 60)

print(

    profiler.get(

        "LAPTOP-EJCUMHRK"

    )

)