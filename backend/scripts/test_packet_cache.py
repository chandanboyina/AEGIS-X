from simulation.enterprise_pipeline import EnterprisePipeline
from core.packet_cache import packet_cache

pipeline = EnterprisePipeline()

for packet in pipeline.run_live():

    if not packet.get("completed"):
        continue

    break

cached = packet_cache.get()

print()

print("=" * 50)

print("CACHE TEST")

print("=" * 50)

print(cached is packet)

print(cached["incident"]["incident_id"])