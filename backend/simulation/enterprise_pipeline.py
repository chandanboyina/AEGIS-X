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

from fastapi.encoders import jsonable_encoder

import copy



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

    def create_packet(self, event):
        """Initializes the base packet structure."""
        return {
            "timestamp": datetime.now().isoformat(),
            "event": event,
            "asset": event.get("asset", {}),
            "completed": False
        }

    def process_event(self, event, snapshot):
        import json
        from core.packet_cache import packet_cache

        # 1. Initialize Base Packet Structures
        packet = self.create_packet(event)
        asset = event.get("asset")
        event_data = event.copy()
        if asset:
            event_data.pop("asset")

        # 2. Sequential Module Processing
        packet = EvidenceBuilder.build(event_data, asset)
        packet = ContextEngine.enrich(packet)
        packet = FeatureEngine.extract(packet)
        packet = self.observer.observe(packet)
        packet["behavior"] = self.behavior.analyze(event, snapshot)
        
        # 3. Build Threat Correlation BEFORE passing to Incident Manager
        correlation_input = {
            "event_type": packet["event"]["event_type"],
            "severity": packet["event"]["severity"],
            "asset": packet["asset"]["hostname"],
            "observer": {"confidence": packet["observer"]["confidence"]},
            "behavior": packet["behavior"]
        }
        packet["correlation"] = self.correlation.build(
            threat=correlation_input, behavior=packet["behavior"],
            campaign={}, ueba={}, cyber_dna={}, business={}, enterprise={}
        ) or {"status": "none", "threat_level": "low"}

        # 4. Invoke Incident Manager Lifecycle 
        packet = self.incident_manager.process(packet)

        # 5. Populate Complex Enterprise AI Engine Data Fields
        if packet.get("completed"):
            packet["enterprise_ai"] = {
                "brain": {
                    "history": self.brain.attack_history(packet["asset"]["hostname"]),
                    "similar": self.brain.find_similar(packet)
                },
                "cyber_dna": self.cyber_dna.build(packet),
                "digital_twin": self.digital_twin.simulate(packet)
            }
            packet["trace"] = ["Evidence", "Context", "Features", "Observer", "Behavior", "Correlation", "Incident Manager", "Oracle", "Sentinel", "Commander", "AI Council", "Enterprise Brain", "Cyber DNA", "Digital Twin"]
            packet["pipeline"] = {"name": "Enterprise AI Pipeline", "version": "AEGIS-X 1.0", "status": "Completed", "completed_at": datetime.now().isoformat(), "modules": packet["trace"]}
            packet["enterprise"] = {"pipeline": "AEGIS-X", "mode": "Live", "completed": True}

        # 6. FINAL DATA PURIFICATION (Cycle-Aware & Recursion-Safe)
        # 6. FINAL DATA PURIFICATION (Smart Key Matching)
        def safe_purify(obj, visited=None):
            if visited is None:
                visited = set()
            obj_id = id(obj)
            if obj_id in visited:
                return "[Circular Reference Hidden]"
            if isinstance(obj, (str, int, float, bool, type(None))):
                return obj
            if isinstance(obj, (dict, list)):
                visited.add(obj_id)
            try:
                if isinstance(obj, dict):
                    return {str(k): safe_purify(v, visited.copy()) for k, v in obj.items()}
                elif isinstance(obj, list):
                    return [safe_purify(item, visited.copy()) for item in obj]
                return str(obj)
            except Exception:
                return str(obj)

        # Take a snapshot copy of the full running packet
        summary_snapshot = packet.copy()

        # Dynamic Extraction: Check top-level first, then check enterprise_ai block wrapper
        raw_brain = packet.get("brain") or packet.get("enterprise_ai", {}).get("brain", {})
        raw_dna = packet.get("cyber_dna") or packet.get("enterprise_ai", {}).get("cyber_dna", {})
        raw_twin = packet.get("digital_twin") or packet.get("enterprise_ai", {}).get("digital_twin", {})
        raw_council = packet.get("council") or packet.get("ai_council", {})

        # Uniformly bind them to both locations so neither endpoint nor frontend breaks
        purified_brain = safe_purify(raw_brain)
        purified_dna = safe_purify(raw_dna)
        purified_twin = safe_purify(raw_twin)

        summary_snapshot["council"] = safe_purify(raw_council)
        summary_snapshot["brain"] = purified_brain
        summary_snapshot["cyber_dna"] = purified_dna
        summary_snapshot["digital_twin"] = purified_twin

        summary_snapshot["enterprise_ai"] = {
            "brain": purified_brain,
            "cyber_dna": purified_dna,
            "digital_twin": purified_twin
        }
        
        if "pipeline" in summary_snapshot:
            summary_snapshot["pipeline"] = safe_purify(summary_snapshot["pipeline"])
        if "incident_report" in summary_snapshot:
            summary_snapshot["incident_report"] = safe_purify(summary_snapshot["incident_report"])
        if "correlation" in summary_snapshot:
            summary_snapshot["correlation"] = safe_purify(summary_snapshot["correlation"])

        # Final serialization check sweep
        clean_purified_packet = safe_purify(summary_snapshot)

        # 7. Update Cache Engine Instance
        packet_cache.set(clean_purified_packet)

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

        print("RUN_LIVE STARTED")

        """
        Live enterprise monitoring.
        """

        events = self.stream.generate_stream()

        snapshot = self.activity.build(events)

        for event in events:

            print(f"Processing event: {event['asset']['hostname']}")

            yield self.process_event(
                event,
                snapshot
            )

    def generate_statistics(self, packets):

        return self.statistics.summarize(
            packets
        )