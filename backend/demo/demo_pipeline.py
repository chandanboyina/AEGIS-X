"""
==============================================================
AEGIS-X Enterprise Cyber Defence Platform
Demo Pipeline
==============================================================

This file is a presentation pipeline used only for demonstrations.

Original Enterprise Pipeline remains untouched.

Purpose

Enterprise Events
        ↓
Evidence Builder
        ↓
Context Engine
        ↓
Feature Extraction
        ↓
Observer AI
        ↓
Behaviour Engine
        ↓
Correlation Engine
        ↓
Incident Manager
        ↓
Enterprise Brain
        ↓
Cyber DNA
        ↓
Digital Twin
        ↓
Executive Dashboard

==============================================================
"""

from datetime import datetime
import asyncio
import copy
import json
import time
from pprint import pprint

# ----------------------------------------------------------
# Core AI Modules
# ----------------------------------------------------------

from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine

from agents.observer.observer_agent import ObserverAgent
from agents.ueba.ai_behavior_engine import AIBehaviorEngine
from agents.correlation.enterprise_intelligence_builder import (
    EnterpriseIntelligenceBuilder,
)

from agents.ueba.current_activity_builder import (
    CurrentActivityBuilder,
)

from agents.incident_manager.incident_manager import (
    IncidentManager,
)

from agents.knowledge_graph.enterprise_brain import (
    EnterpriseCyberBrain,
)

from agents.cyber_dna.cyber_dna import CyberDNA

from agents.digital_twin.digital_twin import CyberDigitalTwin

from simulation.enterprise_stream import EnterpriseEventStream
from simulation.enterprise_statistics import EnterpriseStatistics

# ----------------------------------------------------------
# Demo Pipeline
# ----------------------------------------------------------


class DemoEnterprisePipeline:

    """
    Executive Demonstration Pipeline

    This class is completely independent from
    EnterprisePipeline.

    It executes the same AI modules but prints
    professional executive output.
    """

    def __init__(self):

        # Event Generator

        self.stream = EnterpriseEventStream()

        # AI Engines

        self.observer = ObserverAgent()

        self.behavior = AIBehaviorEngine()

        self.correlation = EnterpriseIntelligenceBuilder()

        self.activity = CurrentActivityBuilder()

        self.incident_manager = IncidentManager()

        self.statistics = EnterpriseStatistics()

        self.brain = EnterpriseCyberBrain()

        self.cyber_dna = CyberDNA()

        self.digital_twin = CyberDigitalTwin()

    # ======================================================
    # Formatting Utilities
    # ======================================================

    def line(self):
        print("=" * 90)

    def subline(self):
        print("-" * 90)

    def blank(self):
        print()

    def title(self, text):

        self.blank()
        self.line()

        print(text.center(90))

        self.line()

    def section(self, text):

        self.blank()

        self.subline()

        print(text)

        self.subline()

    def field(self, key, value):

        print(f"{key:<30}: {value}")

    def success(self, text):

        print(f"✓ {text}")

    def warning(self, text):

        print(f"⚠ {text}")

    def failed(self, text):

        print(f"✗ {text}")

    # ======================================================
    # Dashboard Header
    # ======================================================

    def show_banner(self):

        self.title(
            "AEGIS-X Enterprise Cyber Defence Platform"
        )

        print("Version".ljust(25), ": AEGIS-X 1.0")

        print("Mode".ljust(25), ": Enterprise Demonstration")

        print(
            "Execution Time".ljust(25),
            ":",
            datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
        )

        self.blank()

    # ======================================================
    # Pipeline Progress
    # ======================================================

    def show_pipeline_start(self):

        self.section("Pipeline Execution")

        print(
            "Enterprise Security Monitoring Started..."
        )

        self.blank()

    def show_stage(self, stage):

        self.success(stage)

    # ======================================================
    # Event Information
    # ======================================================

    def show_event(self, event):

        asset = event.get("asset", {})

        self.section("Incoming Security Event")

        self.field(
            "Hostname",
            asset.get("hostname", "-"),
        )

        self.field(
            "Department",
            asset.get("department", "-"),
        )

        self.field(
            "Operating System",
            asset.get("os", "-"),
        )

        self.field(
            "IP Address",
            asset.get("ip", "-"),
        )

        self.field(
            "Event Type",
            event.get("event_type", "-"),
        )

        self.field(
            "Severity",
            event.get("severity", "-"),
        )

        self.field(
            "Timestamp",
            event.get("timestamp", "-"),
        )

    # ======================================================
    # Packet Creation
    # ======================================================

    def create_packet(self, event):

        return {

            "timestamp": datetime.now().isoformat(),

            "event": event,

            "asset": event.get("asset", {}),

            "completed": False,

        }

    # ======================================================
    # Main Processing Function
    # ======================================================

    def process_event(self, event, snapshot):

        """
        Complete AI Processing Pipeline

        Part 2 will implement the entire processing logic.
        """

        packet = self.create_packet(event)

        asset = event.get("asset")

        event_data = event.copy()

        if asset:

            event_data.pop("asset")

        # ==================================================
        # PART 2 STARTS HERE
        # ==================================================

                # ==================================================
        # Evidence Builder
        # ==================================================

        self.show_stage("Evidence Builder")

        packet = EvidenceBuilder.build(
            event_data,
            asset
        )

        # ==================================================
        # Context Engine
        # ==================================================

        self.show_stage("Context Engine")

        packet = ContextEngine.enrich(
            packet
        )

        # ==================================================
        # Feature Extraction
        # ==================================================

        self.show_stage("Feature Extraction")

        packet = FeatureEngine.extract(
            packet
        )

        # ==================================================
        # Observer AI
        # ==================================================

        self.show_stage("Observer AI")

        packet = self.observer.observe(
            packet
        )

        # ==================================================
        # Behaviour Engine
        # ==================================================

        self.show_stage("Behaviour Engine")

        packet["behavior"] = self.behavior.analyze(
            event,
            snapshot
        )

        # ==================================================
        # Correlation Engine
        # ==================================================

        correlation_input = {

            "event_type":
                packet["event"]["event_type"],

            "severity":
                packet["event"]["severity"],

            "asset":
                packet["asset"]["hostname"],

            "observer": {

                "confidence":
                    packet["observer"]["confidence"]

            },

            "behavior":
                packet["behavior"]

        }

        self.show_stage("Correlation Engine")

        packet["correlation"] = self.correlation.build(

            threat=correlation_input,

            behavior=packet["behavior"],

            campaign={},

            ueba={},

            cyber_dna={},

            business={},

            enterprise={}

        ) or {

            "status": "none",

            "threat_level": "low"

        }

        # ==================================================
        # Incident Manager
        # ==================================================

        self.show_stage("Incident Manager")

        packet = self.incident_manager.process(
            packet
        )

        # ==================================================
        # Enterprise AI Modules
        # ==================================================

        if packet.get("completed"):

            packet["enterprise_ai"] = {}

            # ---------------------------------------------

            self.show_stage("Enterprise Brain")

            brain = {

                "history":
                    self.brain.attack_history(
                        packet["asset"]["hostname"]
                    ),

                "similar":
                    self.brain.find_similar(
                        packet
                    )

            }

            packet["enterprise_ai"]["brain"] = brain

            # ---------------------------------------------

            self.show_stage("Cyber DNA")

            dna = self.cyber_dna.build(
                packet
            )

            packet["enterprise_ai"]["cyber_dna"] = dna

            # ---------------------------------------------

            self.show_stage("Digital Twin")

            twin = self.digital_twin.simulate(
                packet
            )

            packet["enterprise_ai"]["digital_twin"] = twin

            # ---------------------------------------------

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

                "name":
                    "Enterprise AI Pipeline",

                "version":
                    "AEGIS-X 1.0",

                "status":
                    "Completed",

                "completed_at":
                    datetime.now().isoformat(),

                "modules":
                    packet["trace"]

            }

            packet["enterprise"] = {

                "pipeline":
                    "AEGIS-X",

                "mode":
                    "Demo",

                "completed":
                    True

            }

        # ==================================================
        # Safe Purification
        # ==================================================

        def safe_purify(obj, visited=None):

            if visited is None:

                visited = set()

            obj_id = id(obj)

            if obj_id in visited:

                return "[Circular Reference Hidden]"

            if isinstance(

                obj,

                (str, int, float, bool, type(None))

            ):

                return obj

            if isinstance(

                obj,

                (dict, list)

            ):

                visited.add(obj_id)

            try:

                if isinstance(obj, dict):

                    return {

                        str(k): safe_purify(
                            v,
                            visited.copy()
                        )

                        for k, v in obj.items()

                    }

                elif isinstance(obj, list):

                    return [

                        safe_purify(
                            item,
                            visited.copy()
                        )

                        for item in obj

                    ]

                return str(obj)

            except Exception:

                return str(obj)

        summary = packet.copy()

        raw_brain = (

            packet.get("brain")

            or packet.get(
                "enterprise_ai",
                {}
            ).get(
                "brain",
                {}
            )

        )

        raw_dna = (

            packet.get("cyber_dna")

            or packet.get(
                "enterprise_ai",
                {}
            ).get(
                "cyber_dna",
                {}
            )

        )

        raw_twin = (

            packet.get("digital_twin")

            or packet.get(
                "enterprise_ai",
                {}
            ).get(
                "digital_twin",
                {}
            )

        )

        raw_council = (

            packet.get("council")

            or packet.get(
                "ai_council",
                {}
            )

        )

        summary["brain"] = safe_purify(
            raw_brain
        )

        summary["cyber_dna"] = safe_purify(
            raw_dna
        )

        summary["digital_twin"] = safe_purify(
            raw_twin
        )

        summary["council"] = safe_purify(
            raw_council
        )

        summary["enterprise_ai"] = {

            "brain":
                summary["brain"],

            "cyber_dna":
                summary["cyber_dna"],

            "digital_twin":
                summary["digital_twin"]

        }

        self.blank()

        self.success(
            "Enterprise AI Pipeline Completed"
        )

        return packet
    
        # ======================================================
    # Statistics
    # ======================================================

    def generate_statistics(self, packets):

        """
        Generate enterprise statistics after all
        events have been processed.
        """

        return self.statistics.summarize(
            packets
        )

    # ======================================================
    # Run Complete Simulation
    # ======================================================

    def run(self):

        """
        Executes the complete enterprise simulation.

        Returns
        -------
        list
            List of completed enterprise packets.
        """

        self.show_banner()

        self.show_pipeline_start()

        events = self.stream.generate_stream()

        snapshot = self.activity.build(events)

        packets = []

        total_events = len(events)

        self.section("Simulation Summary")

        self.field(
            "Total Events",
            total_events
        )

        self.field(
            "Execution Mode",
            "Enterprise Demonstration"
        )

        self.blank()

        for index, event in enumerate(events, start=1):

            self.line()

            print(
                f"EVENT {index} OF {total_events}".center(90)
            )

            self.line()

            self.show_event(event)

            packet = self.process_event(
                event,
                snapshot
            )

            packets.append(packet)

            # Presentation methods
            # (Implemented in Part 3B)

            self.print_observer(packet)

            self.print_oracle(packet)

            self.print_sentinel(packet)

            self.print_commander(packet)

            self.print_ai_council(packet)

            self.print_business_impact(packet)

            self.print_summary(packet)

            print()

            print()

        return packets

    # ======================================================
    # Live Monitoring Mode
    # ======================================================

    def run_live(self):

        """
        Live enterprise monitoring.

        Mimics the original EnterprisePipeline.run_live()
        but prints executive presentation output.
        """

        self.show_banner()

        self.show_pipeline_start()

        events = self.stream.generate_stream()

        snapshot = self.activity.build(events)

        total_events = len(events)

        self.section("Live Enterprise Monitoring")

        self.field(
            "Detected Events",
            total_events
        )

        self.blank()

        for index, event in enumerate(events, start=1):

            self.line()

            print(
                f"LIVE EVENT {index}".center(90)
            )

            self.line()

            self.show_event(event)

            packet = self.process_event(
                event,
                snapshot
            )

            # Presentation functions
            # (Implemented in Part 3B)

            self.print_observer(packet)

            self.print_oracle(packet)

            self.print_sentinel(packet)

            self.print_commander(packet)

            self.print_ai_council(packet)

            self.print_business_impact(packet)

            self.print_summary(packet)

            yield packet

    # ======================================================
    # Execute Complete Demonstration
    # ======================================================

    def execute_demo(self):

        """
        Main demo execution.

        Processes all events,
        prints executive dashboard,
        and displays enterprise statistics.
        """

        packets = self.run()

        self.title(
            "Enterprise Statistics"
        )

        statistics = self.generate_statistics(
            packets
        )

        if isinstance(statistics, dict):

            for key, value in statistics.items():

                self.field(
                    str(key),
                    value
                )

        else:

            print(statistics)

        self.blank()

        self.line()

        print(
            "AEGIS-X Enterprise Demonstration Completed".center(90)
        )

        self.line()
            # ======================================================
    # Observer AI Dashboard
    # ======================================================

    def print_observer(self, packet):

        observer = packet.get("observer", {})

        self.section("Observer AI Analysis")

        self.field(
            "Prediction",
            observer.get(
                "prediction",
                observer.get(
                    "decision",
                    "-"
                )
            )
        )

        self.field(
            "Threat Category",
            observer.get(
                "threat_category",
                "-"
            )
        )

        self.field(
            "Confidence",
            f"{observer.get('confidence', '-')}"
        )

        self.field(
            "Risk Score",
            observer.get(
                "risk_score",
                "-"
            )
        )

        self.field(
            "Requires Investigation",
            observer.get(
                "requires_investigation",
                False
            )
        )

        if observer.get(
            "reason"
        ):

            self.field(
                "Reason",
                observer["reason"]
            )

        self.blank()

    # ======================================================
    # Oracle Dashboard
    # ======================================================

    def print_oracle(self, packet):

        oracle = packet.get(
            "oracle",
            {}
        )

        self.section("Oracle AI Decision")

        self.field(
            "Threat Category",
            oracle.get(
                "category",
                "-"
            )
        )

        self.field(
            "Risk Level",
            oracle.get(
                "risk",
                "-"
            )
        )

        self.field(
            "Confidence",
            f"{oracle.get('confidence','-')}%"
        )

        self.field(
            "MITRE Technique",
            oracle.get(
                "mitre",
                oracle.get(
                    "mitre_attack",
                    "-"
                )
            )
        )

        self.field(
            "Status",
            oracle.get(
                "status",
                "-"
            )
        )

        if oracle.get(
            "reasoning"
        ):

            print()

            print("Reasoning")

            self.subline()

            print(
                oracle["reasoning"]
            )

        self.blank()

    # ======================================================
    # Sentinel Dashboard
    # ======================================================

    def print_sentinel(self, packet):

        sentinel = packet.get(
            "sentinel",
            {}
        )

        self.section(
            "Sentinel AI Response"
        )

        self.field(
            "Decision",
            sentinel.get(
                "decision",
                "-"
            )
        )

        self.field(
            "Playbook",
            sentinel.get(
                "playbook",
                "-"
            )
        )

        self.field(
            "Action",
            sentinel.get(
                "action",
                "-"
            )
        )

        self.field(
            "Priority",
            sentinel.get(
                "priority",
                "-"
            )
        )

        self.field(
            "Isolation Required",
            sentinel.get(
                "isolate",
                sentinel.get(
                    "requires_isolation",
                    "-"
                )
            )
        )

        self.field(
            "Status",
            sentinel.get(
                "status",
                "-"
            )
        )

        if sentinel.get(
            "steps"
        ):

            print()

            print("Recommended Actions")

            self.subline()

            steps = sentinel.get(
                "steps",
                []
            )

            for index, step in enumerate(
                steps,
                start=1
            ):

                print(
                    f"{index}. {step}"
                )

        self.blank()
            # ======================================================
    # Commander AI Dashboard
    # ======================================================

    def print_commander(self, packet):

        commander = packet.get("commander", {})

        # sometimes data is inside "recommended"
        if "recommended" in commander:
            commander = commander["recommended"]

        self.section("Commander AI Strategy")

        self.field("Playbook",
                commander.get("playbook_id")
                or commander.get("base_playbook")
                or "-")

        self.field("Strategy",
                commander.get("strategy", "-"))

        self.field("Confidence",
                f"{commander.get('confidence','-')}%")

        self.field("Success Rate",
                f"{commander.get('success_probability','-')}%")

        self.field("Recovery Time",
                f"{commander.get('estimated_recovery','-')} min")

        self.field("Business Impact",
                commander.get("continuity","-"))

        self.field("Estimated Loss",
                f"₹{commander.get('estimated_loss','-')} Cr")

        self.field("Spread",
                commander.get("predicted_spread","-"))

        if commander.get("recommendation"):

            print()

            print("Commander Recommendation")

            self.subline()

            print(
                commander["recommendation"]
            )

        if commander.get("actions"):

            print()

            print("Execution Plan")

            self.subline()

            actions = commander.get(
                "actions",
                []
            )

            for index, action in enumerate(
                actions,
                start=1
            ):

                print(
                    f"{index}. {action}"
                )

        self.blank()


    # ======================================================
    # AI Council Dashboard
    # ======================================================

    def print_ai_council(self, packet):

        council = (
            packet.get("council")
            or packet.get("ai_council", {})
        )

        council = packet.get("council", {})

        self.section("AI Council Decision")

        self.field("Final Decision",
                council.get("winner","-"))

        self.field("Consensus",
                council.get("agreement","-"))

        self.field("Confidence",
                f"{council.get('confidence','-')}%")

        votes = council.get(
            "votes",
            []
        )

        if votes:

            print()

            print("Council Votes")

            self.subline()

            for vote in votes:

                if isinstance(vote, dict):

                    agent = vote.get(
                        "agent",
                        "-"
                    )

                    playbook = vote.get(
                        "playbook",
                        "-"
                    )

                    confidence = vote.get(
                        "confidence",
                        "-"
                    )

                    print(
                        f"{agent:<25}"
                        f"{playbook:<30}"
                        f"{confidence}%"
                    )

                else:

                    print(vote)

        reasoning = council.get(
            "reasoning"
        )

        if reasoning:

            print()

            print("Council Reasoning")

            self.subline()

            if isinstance(reasoning, list):

                for item in reasoning:

                    print(f"• {item}")

            else:

                print(reasoning)

        self.blank()
    # ======================================================
    # Business Impact Dashboard
    # ======================================================

    def print_business_impact(self, packet):

        commander = packet.get("commander", {})

        # Sometimes Commander stores everything inside "recommended"
        if "recommended" in commander:
            commander = commander["recommended"]

        oracle = packet.get("oracle", {})

        self.section("Business Impact Analysis")

        self.field(
            "Business Impact",
            f"{commander.get('continuity', '-')}"
        )

        self.field(
            "Risk Level",
            oracle.get("threat_level", "-")
        )

        self.field(
            "Estimated Loss",
            f"₹{commander.get('estimated_loss', '-')}" + " Cr"
        )

        self.field(
            "Recovery Time",
            str(commander.get("estimated_recovery", "-")) + " min"
        )

        self.field(
            "Services Affected",
            commander.get("services_saved", "-")
        )

        self.field(
            "Operational Status",
            True
        )
        #self.blank()

    # ======================================================
    # Executive Summary
    # ======================================================

    def print_summary(self, packet):

        self.section("Executive Incident Summary")

        observer = packet.get("observer", {})
        oracle = packet.get("oracle", {})
        sentinel = packet.get("sentinel", {})
        commander = packet.get("commander", {})
        council = (
            packet.get("council")
            or packet.get("ai_council", {})
        )

        self.field(
            "Asset",
            packet.get(
                "asset",
                {}
            ).get(
                "hostname",
                "-"
            )
        )

        self.field(
            "Event",
            packet.get(
                "event",
                {}
            ).get(
                "event_type",
                "-"
            )
        )

        self.field(
            "Severity",
            packet.get(
                "event",
                {}
            ).get(
                "severity",
                "-"
            )
        )

        self.field(
            "Observer Decision",
            observer.get(
                "prediction",
                observer.get(
                    "decision",
                    "-"
                )
            )
        )

        self.field(
            "Oracle Category",
            oracle.get(
                "category",
                "-"
            )
        )

        self.field(
            "Sentinel Action",
            sentinel.get(
                "decision",
                sentinel.get(
                    "action",
                    "-"
                )
            )
        )

        self.field(
            "Commander Strategy",
            commander.get(
                "strategy",
                "-"
            )
        )

        self.field(
            "Council Decision",
            council.get(
                "winner",
                council.get(
                    "decision",
                    "-"
                )
            )
        )

        self.field(
            "Pipeline Status",
            packet.get(
                "pipeline",
                {}
            ).get(
                "status",
                "Completed"
            )
        )

        trace = packet.get("trace", [])

        if trace:

            print()

            print("Pipeline Execution")

            self.subline()

            for stage in trace:

                print(f"✓ {stage}")

        self.blank()

        self.line()

        print(
            "INCIDENT PROCESSING COMPLETED".center(90)
        )

        self.line()

        self.blank()

# ======================================================
# Demo Entry Point
# ======================================================

def main():

    print()
    print("=" * 100)
    print("Starting AEGIS-X Enterprise Cyber Defence Platform Demo".center(100))
    print("=" * 100)
    print()

    try:

        demo = DemoEnterprisePipeline()

        demo.execute_demo()

    except KeyboardInterrupt:

        print()
        print("Demo interrupted by user.")

    except Exception as error:

        print()
        print("=" * 100)
        print("DEMO EXECUTION FAILED".center(100))
        print("=" * 100)
        print()
        print(f"Error : {error}")
        print()

        import traceback
        traceback.print_exc()

    finally:

        print()
        print("=" * 100)
        print("Demo Finished".center(100))
        print("=" * 100)
        print()


if __name__ == "__main__":
    main()