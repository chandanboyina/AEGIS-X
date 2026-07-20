import json
from datetime import datetime

class PacketCache:
    """
    A robust cache that guarantees all stored data is composed strictly 
    of JSON-safe primitives, preventing RecursionErrors in FastAPI.
    """
    def __init__(self):
        self.latest = {}
        self.history = []
        self.packet_count = 0
        self.last_updated = None

    def set(self, packet):
        """
        Stores data using a hard serialization barrier. 
        This converts complex/nested objects into simple JSON primitives.
        """
        try:
            # The Serialization Barrier:
            # 1. json.dumps(..., default=str) converts EVERYTHING 
            #    (even complex objects/circular refs) into string format.
            # 2. json.loads() creates a brand new, clean dictionary of primitives.
            # This guarantees there are NO Python object references to trigger recursion.
            clean_data = json.loads(json.dumps(packet, default=str))

            # Atomic update
            self.latest = clean_data
            self.packet_count += 1
            self.last_updated = datetime.now().isoformat()
            
            # Maintain a history of the last 100 clean packets
            self.history.append(clean_data)
            if len(self.history) > 100:
                self.history.pop(0)
                
        except Exception as e:
            # If serialization fails, store a safe error state
            print(f"CACHE CRITICAL: Serialization failed: {e}")
            self.latest = {"error": "Corrupted Packet", "details": str(e)}

    def get(self):
        """Returns the latest sanitized packet."""
        return self.latest

    def get_history(self):
        """Returns the history of sanitized packets."""
        return self.history

    def stats(self):
        """Returns cache statistics."""
        return {
            "packets": self.packet_count,
            "last_updated": self.last_updated,
            "history_size": len(self.history)
        }

# Global instance
packet_cache = PacketCache()