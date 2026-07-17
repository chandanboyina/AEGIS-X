from core.packet_cache import packet_cache
from core.websocket_manager import manager


class EnterpriseStatusService:
    """
    Overall backend health.
    """

    def build(self):

        cache = packet_cache.stats()

        websocket = manager.statistics()

        return {

            "application": "AEGIS-X",

            "version": "1.0",

            "pipeline": "Running",

            "cache": cache,

            "websocket": websocket

        }