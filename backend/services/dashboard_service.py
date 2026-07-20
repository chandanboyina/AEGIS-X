from core.packet_cache import packet_cache
from api.packet_serializer import PacketSerializer

class DashboardService:
    def __init__(self):
        self.serializer = PacketSerializer()

    def latest_packet(self):
        """
        Fetches the latest packet from the cache. 
        The packet is already sanitized/serialized into a dict of primitives.
        """
        packet = packet_cache.get()
        
        # If the cache returned an error dict or is empty, return an empty dict
        if not packet or "error" in packet:
            return {}

        # The cache already returns a plain dictionary of primitives (no complex objects).
        # We return it directly.
        return packet

    def dashboard(self):
        """
        Returns the serialized dashboard data.
        """
        packet = self.latest_packet()
        if not packet:
            return {}

        # Use the serializer only to format the final output if needed,
        # otherwise, returning the raw dict is perfectly valid for FastAPI.
        return self.serializer.serialize(packet)