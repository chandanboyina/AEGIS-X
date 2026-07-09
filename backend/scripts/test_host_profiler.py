from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.host_profiler import HostProfiler

pipeline = WindowsPipeline()

windows = pipeline.run()

profiler = HostProfiler()

for collector in windows.values():

    for event in collector:

        profiler.update(event)

print(

    profiler.db.get_host(

        "LAPTOP-EJCUMHRK"

    )

)