from datetime import datetime


class PacketCache:

    def __init__(self):

        self.latest = None

        self.history = []

        self.packet_count = 0

        self.last_updated = None

    def set(self, packet):

        self.latest = packet

        self.packet_count += 1

        self.last_updated = datetime.now().isoformat()

        self.history.append(packet)

        if len(self.history) > 100:

            self.history.pop(0)

    def get(self):

        return self.latest

    def get_history(self):

        return self.history

    def stats(self):

        return {

            "packets": self.packet_count,

            "last_updated": self.last_updated,

            "history_size": len(self.history)

        }


packet_cache = PacketCache()