from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine

from simulation.enterprise_stream import EnterpriseEventStream
from agents.observer.observer_agent import ObserverAgent

from simulation.enterprise_statistics import EnterpriseStatistics


class EnterprisePipeline:
    """
    Complete Enterprise AI Pipeline.

    Enterprise Events
            ↓
    Evidence Builder
            ↓
    Context Engine
            ↓
    Feature Engine
            ↓
    Observer AI
            ↓
    Cyber Evidence Packet
    """

    def __init__(self):

        # Event Stream
        self.stream = EnterpriseEventStream()

        # Observer AI
        # Automatically loads the trained model
        self.observer = ObserverAgent()

        self.statistics = EnterpriseStatistics()

    def process_event(self, event: dict):

        """
        Process one enterprise event.
        """

        asset = event["asset"]

        event_data = event.copy()

        event_data.pop("asset")

        # -----------------------------
        # Evidence Builder
        # -----------------------------

        packet = EvidenceBuilder.build(
            event_data,
            asset,
        )

        # -----------------------------
        # Context Engine
        # -----------------------------

        packet = ContextEngine.enrich(packet)

        # -----------------------------
        # Feature Extraction
        # -----------------------------

        packet = FeatureEngine.extract(packet)

        # -----------------------------
        # Observer AI
        # -----------------------------

        packet = self.observer.observe(
            packet
        )

        return packet
    def run(self):

        """
        Process one complete enterprise stream.
        """

        packets = []

        events = self.stream.generate_stream()

        for event in events:

            packet = self.process_event(event)

            packets.append(packet)

        return packets

    def run_live(self):

        """
        Live enterprise monitoring.
        """

        events = self.stream.generate_stream()

        for event in events:

            yield self.process_event(event)

    def generate_statistics(self, packets):

        return self.statistics.summarize(
            packets
        )