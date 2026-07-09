from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.network_profiler import NetworkProfiler


pipeline = WindowsPipeline()

windows = pipeline.run()

network = NetworkProfiler()

for collector in windows.values():

    for event in collector:

        network.update(event)

print("=" * 60)
print("NETWORK PROFILE")
print("=" * 60)

for host in network.network:

    print(host)

    print(network.get(host))

    print("-" * 60)