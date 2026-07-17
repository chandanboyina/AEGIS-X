from simulation.enterprise_pipeline import EnterprisePipeline
from api.packet_serializer import PacketSerializer

pipeline = EnterprisePipeline()

serializer = PacketSerializer()

for packet in pipeline.run_live():

    if not packet.get("completed"):
        continue

    data = serializer.serialize(packet)

    print("\n===== SERIALIZER =====")

    print(data.keys())

    print("======================")

    break