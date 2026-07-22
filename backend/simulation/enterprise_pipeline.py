from datetime import datetime
import time
from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine
from core.websocket_manager import manager
from simulation.enterprise_stream import EnterpriseEventStream
from agents.observer.observer_agent import ObserverAgent
import asyncio
from simulation.enterprise_statistics import EnterpriseStatistics
from agents.oracle.oracle_agent import OracleAgent
from pprint import pprint
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

    def __init__(self, loop=None):

        self.loop = loop

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

        print("\n===== EVENT RECEIVED BY PIPELINE =====")
        print(event)
        print("\n===== ASSET RECEIVED BY PIPELINE =====")
        print(asset)
        self.send_stage("Evidence Builder", "running")
        packet = EvidenceBuilder.build(event_data, asset)
        self.send_stage("Evidence Builder", "completed")
        time.sleep(0.3)
        
        self.send_stage("Context Engine", "running")
        packet = ContextEngine.enrich(packet)
        self.send_stage("Context Engine", "completed")
        time.sleep(0.3)

        self.send_stage("Feature Extraction", "running")
        packet = FeatureEngine.extract(packet)
        self.send_stage("Feature Extraction", "completed")
        time.sleep(0.3)

        self.send_stage("Observer AI", "running")
        packet = self.observer.observe(packet)
        #print("\n========== OBSERVER OUTPUT ==========")
        #pprint(packet["observer"])
        #print("=====================================\n")
        self.send_stage("Observer AI", "completed")
        time.sleep(0.3)

        self.send_stage("Behaviour Engine", "running")
        packet["behavior"] = self.behavior.analyze(event, snapshot)
        self.send_stage("Behaviour Engine", "completed")
        time.sleep(0.3)
        
        # 3. Build Threat Correlation BEFORE passing to Incident Manager
        correlation_input = {
            "event_type": packet["event"]["event_type"],
            "severity": packet["event"]["severity"],
            "asset": packet["asset"]["hostname"],
            "observer": {"confidence": packet["observer"]["confidence"]},
            "behavior": packet["behavior"]
        }

        self.send_stage("Correlation Engine", "running")
        packet["correlation"] = self.correlation.build(
            threat=correlation_input, behavior=packet["behavior"],
            campaign={}, ueba={}, cyber_dna={}, business={}, enterprise={}
        ) or {"status": "none", "threat_level": "low"}
        self.send_stage("Correlation Engine", "completed")
        time.sleep(0.3)

        # 4. Invoke Incident Manager Lifecycle 
        self.send_stage("Incident Manager", "running")
        packet = self.incident_manager.process(packet)
        self.send_stage("Incident Manager", "completed")
        time.sleep(0.3)

        # 5. Populate Complex Enterprise AI Engine Data Fields
        if packet.get("completed"):
            packet["enterprise_ai"] = {}

            # -----------------------------------------
            # Enterprise Brain
            # -----------------------------------------
            self.send_stage("Enterprise Brain", "running")

            brain = {
                "history": self.brain.attack_history(
                    packet["asset"]["hostname"]
                ),
                "similar": self.brain.find_similar(packet)
            }

            packet["enterprise_ai"]["brain"] = brain

            self.send_stage("Enterprise Brain", "completed")
            time.sleep(0.3)

            # -----------------------------------------
            # Cyber DNA
            # -----------------------------------------
            self.send_stage("Cyber DNA", "running")

            cyber_dna = self.cyber_dna.build(packet)

            packet["enterprise_ai"]["cyber_dna"] = cyber_dna

            self.send_stage("Cyber DNA", "completed")
            time.sleep(0.3)

            # -----------------------------------------
            # Digital Twin
            # -----------------------------------------
            self.send_stage("Digital Twin", "running")

            digital_twin = self.digital_twin.simulate(packet)

            packet["enterprise_ai"]["digital_twin"] = digital_twin
            self.send_stage("Digital Twin", "completed")
            time.sleep(0.3)

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

        self.send_stage(
            "Dashboard Updated",
            "completed"
        )

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

        print("\n========== GENERATED EVENTS ==========")
        for i, event in enumerate(events, 1):
            print(f"{i:02d}. {event['event_type']}")
        print("======================================\n")

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
    
    def send_stage(self, stage, status):
        print(stage, status)
        if self.loop is None:
            return

        asyncio.run_coroutine_threadsafe(

            manager.broadcast({

                "type": "pipeline",

                "stage": stage,

                "status": status

            }),

            self.loop

        )