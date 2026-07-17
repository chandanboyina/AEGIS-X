from api.packet_serializer import PacketSerializer
from core.websocket_manager import manager


class EnterpriseBroadcaster:
    """
    Broadcasts enterprise packets
    to every connected dashboard.
    """

    def __init__(self):

        self.serializer = PacketSerializer()

    async def publish(
        self,
        packet
    ):

        await manager.broadcast(

            self.serializer.serialize(
                packet
            )

        )


broadcaster = EnterpriseBroadcaster()