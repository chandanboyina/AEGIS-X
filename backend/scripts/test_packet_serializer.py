from simulation.enterprise_pipeline import EnterprisePipeline
from api.packet_serializer import PacketSerializer

pipeline = EnterprisePipeline()
serializer = PacketSerializer()

for packet in pipeline.run_live():

    if not packet.get("completed"):
        continue

    dashboard = serializer.serialize(packet)

    print()

    print("=" * 60)
    print("PACKET SERIALIZER")
    print("=" * 60)

    print(dashboard.keys())

    break