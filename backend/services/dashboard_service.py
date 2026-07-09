from simulation.enterprise_pipeline import EnterprisePipeline
from api.packet_serializer import PacketSerializer


class DashboardService:

    def __init__(self):

        self.pipeline = EnterprisePipeline()

        self.serializer = PacketSerializer()

    def latest_packet(self):

        for packet in self.pipeline.run_live():

            if not packet.get("completed"):
                continue

            return self.serializer.serialize(packet)

        return None