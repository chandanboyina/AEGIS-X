from simulation.enterprise_pipeline import EnterprisePipeline
from api.packet_serializer import PacketSerializer
from core.packet_cache import packet_cache


class DashboardService:
    """
    Enterprise Dashboard Service.

    Produces the latest enterprise packet
    for the frontend.
    """

    def __init__(self):

        self.pipeline = EnterprisePipeline()

        self.serializer = PacketSerializer()

    def latest_packet(self):

        packet = packet_cache.get()

        #
        # First request after backend startup
        #

        if packet is None:

            for packet in self.pipeline.run_live():

                if packet.get("completed"):

                    break

            packet = packet_cache.get()

        return self.serializer.serialize(packet)

    def dashboard(self):

        packet = self.latest_packet()

        if packet is None:
            return None

        return self.serializer.serialize(packet)