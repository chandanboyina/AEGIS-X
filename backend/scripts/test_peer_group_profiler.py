from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.peer_group_profiler import PeerGroupProfiler


pipeline = WindowsPipeline()

windows = pipeline.run()

peer = PeerGroupProfiler()

for collector in windows.values():

    for event in collector:

        peer.update(event)

print("=" * 60)
print("PEER GROUP PROFILE")
print("=" * 60)

for group in peer.groups:

    print(group)

    print(

        peer.get(group)

    )

    print("-" * 60)