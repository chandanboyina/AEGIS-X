from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.time_profiler import TimeProfiler

pipeline = WindowsPipeline()

windows = pipeline.run()

profiler = TimeProfiler()

for collector in windows.values():

    for event in collector:

        profiler.update(event)

print("=" * 60)
print("TIME DATABASE")
print("=" * 60)

print(

    profiler.get(

        "LAPTOP-EJCUMHRK"

    )

)