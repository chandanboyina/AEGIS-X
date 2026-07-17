from core.packet_cache import packet_cache


class CacheService:

    def latest(self):

        return packet_cache.get()

    def history(self):

        return packet_cache.get_history()

    def stats(self):

        return packet_cache.stats()