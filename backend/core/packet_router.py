from core.packet_cache import packet_cache
from core.websocket_manager import manager


class PacketRouter:

    async def publish(self, packet):

        packet_cache.set(packet)

        websocket_packet = {

            "type": "full_dashboard",

            **packet

        }

        await manager.broadcast(
            websocket_packet
        )


router = PacketRouter()