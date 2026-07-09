from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.process_profiler import ProcessProfiler

pipeline = WindowsPipeline()

windows = pipeline.run()

profiler = ProcessProfiler()

for collector in windows.values():

    for event in collector:

        profiler.update(event)

#
# Print all learned processes
#

db = profiler.db.load()

print("=" * 60)
print("PROCESS PROFILES")
print("=" * 60)
print()

for process, profile in db["processes"].items():

    print(process)

    print(profile)

    print("-" * 60)