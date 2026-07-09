from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.peer_group_profiler import PeerGroupProfiler

pipeline = WindowsPipeline()

windows = pipeline.run()

profiler = PeerGroupProfiler()

for collector in windows.values():

    for event in collector:

        profiler.update(event)

print("=" * 60)
print("PEER GROUP DATABASE")
print("=" * 60)

print(

    profiler.get(

        "Workstations"

    )

)