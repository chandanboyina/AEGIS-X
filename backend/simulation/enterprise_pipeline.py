from datetime import datetime

from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine

from simulation.enterprise_stream import EnterpriseEventStream
from agents.observer.observer_agent import ObserverAgent

from simulation.enterprise_statistics import EnterpriseStatistics
from agents.oracle.oracle_agent import OracleAgent

from agents.ueba.ai_behavior_engine import AIBehaviorEngine

from agents.correlation.enterprise_intelligence_builder import EnterpriseIntelligenceBuilder

from agents.knowledge_graph.enterprise_brain import EnterpriseCyberBrain

from agents.cyber_dna.cyber_dna import CyberDNA

from agents.digital_twin.digital_twin import CyberDigitalTwin

from agents.commander.commander_ai import CommanderAI

from agents.council.debate_engine import DebateEngine

from agents.sentinel.sentinel_agent import SentinelAgent

from agents.ueba.current_activity_builder import CurrentActivityBuilder

from agents.incident_manager.incident_manager import IncidentManager

from core.packet_cache import packet_cache


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

        self.behavior = AIBehaviorEngine()

        self.correlation = EnterpriseIntelligenceBuilder()

        self.activity = CurrentActivityBuilder()

        self.incident_manager = IncidentManager()

        self.commander = CommanderAI()

        self.digital_twin = CyberDigitalTwin()

        self.brain = EnterpriseCyberBrain()

        self.cyber_dna = CyberDNA()

    def process_event(self, event, snapshot):

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

        # -----------------------------
        # Behavior AI
        # -----------------------------

        packet["behavior"] = self.behavior.analyze(
            event,
            snapshot
        )

        # -----------------------------
        # Enterprise Correlation
        # -----------------------------

        packet["correlation"] = self.correlation.build(
            [packet]
        )

        packet = self.incident_manager.process(
            packet
        )

        if not packet.get("completed"):
            return packet

        # -----------------------------
        # Enterprise Brain
        # -----------------------------

        packet["enterprise_ai"] = {

            "brain": {

                "history": self.brain.attack_history(
                    packet["asset"]["hostname"]
                ),

                "similar": self.brain.find_similar(packet)

            },

            "cyber_dna": self.cyber_dna.build(packet),

            "digital_twin": self.digital_twin.simulate(packet)

        }


        packet["trace"] = [

            "Evidence",

            "Context",

            "Features",

            "Observer",

            "Behavior",

            "Correlation",

            "Incident Manager",

            "Oracle",

            "Sentinel",

            "Commander",

            "AI Council",

            "Enterprise Brain",

            "Cyber DNA",

            "Digital Twin"

        ]

        packet["pipeline"] = {

            "name": "Enterprise AI Pipeline",

            "version": "AEGIS-X 1.0",

            "status": "Completed",

            "completed_at": datetime.now().isoformat(),

            "modules": packet["trace"]

        }

        packet["enterprise"] = {

            "pipeline": "AEGIS-X",

            "mode": "Live",

            "completed": True

        }

        # -------------------------------------
        # Update latest enterprise packet
        # -------------------------------------

        packet_cache.set(packet)

        return packet
    def run(self):

        """
        Process one complete enterprise stream.
        """


        events = self.stream.generate_stream()

        snapshot = self.activity.build(events)

        packets = []

        for event in events:

            packet = self.process_event(event, snapshot)

            packets.append(packet)

        return packets

    def run_live(self):

        """
        Live enterprise monitoring.
        """

        events = self.stream.generate_stream()

        snapshot = self.activity.build(events)

        for event in events:

            yield self.process_event(
                event,
                snapshot
            )

    def generate_statistics(self, packets):

        return self.statistics.summarize(
            packets
        )