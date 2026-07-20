from services.dashboard_service import DashboardService

class DashboardController:
    def __init__(self):
        self.dashboard = DashboardService()

    def _get_safe_packet(self):
        """Fetches the latest packet and ensures it is a dictionary."""
        packet = self.dashboard.latest_packet()
        return packet if isinstance(packet, dict) else {}

    def _get_safe_dict(self, key):
        """
        Helper to ensure nested data is returned as a dictionary.
        Verifies the result is a dictionary to prevent AttributeErrors.
        """
        packet = self._get_safe_packet()
        data = packet.get(key, {})
        return data if isinstance(data, dict) else {}

    def latest(self):
        """Returns the full purified snapshot packet."""
        return self._get_safe_packet()

    def summary(self):
        """Returns the full running payload for executive analytics summaries."""
        return self._get_safe_packet()

    def council(self):
        """
        Returns the AI Council debate data structure.
        Looks at the top-level 'council' key first, falls back to 'ai_council',
        and defaults to 'N/A' if empty.
        """
        packet = self._get_safe_packet()
        
        council_data = packet.get("council")
        if not council_data or council_data == "N/A":
            council_data = packet.get("ai_council")

        return council_data if council_data else "N/A"

    def brain(self):
        """
        Accesses 'brain' data safely by checking top-level first,
        then falling back to the nested 'enterprise_ai' wrapper.
        """
        packet = self._get_safe_packet()
        nested_ai = self._get_safe_dict("enterprise_ai")
        
        brain_data = packet.get("brain") or nested_ai.get("brain")
        return brain_data if brain_data else "N/A"

    def dna(self):
        """
        Accesses 'cyber_dna' data safely by checking top-level first,
        then falling back to the nested 'enterprise_ai' wrapper.
        """
        packet = self._get_safe_packet()
        nested_ai = self._get_safe_dict("enterprise_ai")
        
        dna_data = packet.get("cyber_dna") or nested_ai.get("cyber_dna")
        return dna_data if dna_data else "N/A"

    def twin(self):
        """
        Accesses 'digital_twin' data safely by checking top-level first,
        then falling back to the nested 'enterprise_ai' wrapper.
        """
        packet = self._get_safe_packet()
        nested_ai = self._get_safe_dict("enterprise_ai")
        
        twin_data = packet.get("digital_twin") or nested_ai.get("digital_twin")
        return twin_data if twin_data else "N/A"

    def pipeline(self):
        """Returns the pipeline metadata block."""
        return self._get_safe_packet().get("pipeline", "N/A")

    def trace(self):
        """Ensures we always return a clean list for execution trace modules."""
        trace = self._get_safe_packet().get("trace", [])
        return trace if isinstance(trace, list) else []