from datetime import datetime
from agents.incident_manager.incident_status import IncidentStatus
from agents.incident_manager.incident_assignment import IncidentAssignment
from agents.incident_manager.incident_history import IncidentHistory
from agents.incident_manager.incident_report import IncidentReport
from agents.incident_manager.incident_lifecycle import IncidentLifecycle
from agents.incident_manager.case_manager import CaseManager
from agents.incident_manager.case_notes import CaseNotes
from agents.incident_manager.evidence_manager import EvidenceManager
from agents.incident_manager.case_tags import CaseTags
from agents.incident_manager.investigation_timeline import InvestigationTimeline
from agents.incident_manager.analyst_actions import AnalystActions
from agents.incident_manager.evidence_chain import EvidenceChain
from agents.incident_manager.activity_feed import ActivityFeed
from agents.incident_manager.mitre_mapper import MitreMapper
from agents.incident_manager.ioc_extractor import IOCExtractor
from agents.incident_manager.attack_chain import AttackChain
from agents.incident_manager.recovery_status import RecoveryStatus
from agents.incident_manager.investigation_summary import InvestigationSummary
from agents.incident_manager.ioc_enrichment import IOCEnrichment
from agents.incident_manager.timeline_builder import TimelineBuilder
from agents.incident_manager.mitre_confidence import MitreConfidence
from agents.incident_manager.collaboration_engine import CollaborationEngine
from agents.incident_manager.case_metrics import CaseMetrics
from agents.incident_manager.ioc_manager import IOCManager
from agents.incident_manager.incident_repository import IncidentRepository
from agents.commander.commander_ai import CommanderAI
from agents.infrastructure.asset_inventory import AssetInventory
from agents.infrastructure.dependency_graph import EnterpriseDependencyGraph
from agents.infrastructure.blast_radius import BlastRadius
from agents.oracle.oracle_agent import OracleAgent
from agents.digital_twin.digital_twin import CyberDigitalTwin
from agents.council.debate_engine import DebateEngine
from agents.knowledge_graph.enterprise_brain import EnterpriseCyberBrain
from agents.council.debate_engine import DebateEngine
from agents.sentinel.sentinel_agent import SentinelAgent
from agents.cyber_dna.cyber_dna import CyberDNA

#from backend.models import incident


class IncidentManager:
    """
    Enterprise Incident Manager.
    """

    counter = 1

    def __init__(self):

        self.status = IncidentStatus()

        self.assignment = IncidentAssignment()

        self.history = IncidentHistory()

        self.report = IncidentReport()

        self.lifecycle = IncidentLifecycle()

        self.case_manager = CaseManager()

        self.case_notes = CaseNotes()

        self.evidence = EvidenceManager()

        self.case_tags = CaseTags()

        self.mitre_mapper = MitreMapper()

        self.mitre_confidence = MitreConfidence()

        self.iocs = IOCExtractor()

        self.ioc_enrichment = IOCEnrichment()

        self.attack_chain = AttackChain()

        self.recovery_status = RecoveryStatus()

        self.summary = InvestigationSummary()

        self.timeline = TimelineBuilder()

        self.analyst_actions = AnalystActions()

        self.evidence_chain = EvidenceChain()

        self.activity_feed = ActivityFeed()

        self.collaboration = CollaborationEngine()

        self.case_metrics = CaseMetrics()

        self.repository = IncidentRepository()

        self.ioc_manager = IOCManager()

        self.commander = CommanderAI()

        self.oracle = OracleAgent()

        self.asset_inventory = AssetInventory()

        self.dependency_graph = EnterpriseDependencyGraph()

        self.blast_radius = BlastRadius()

        self.digital_twin = CyberDigitalTwin()

        self.council = DebateEngine()

        self.brain = EnterpriseCyberBrain()

        self.council = DebateEngine()
        
        self.sentinel = SentinelAgent()

        self.cyber_dna = CyberDNA()

        
    def process(self, packet):
        """
        Complete enterprise incident processing pipeline.

        Observer
            ↓
        Oracle
            ↓
        Sentinel
            ↓
        Incident Builder
            ↓
        Commander
            ↓
        AI Council
            ↓
        Enterprise Learning
        """

        if "correlation" not in packet:
            print("WARNING: Missing correlation in packet. Building default.")
            packet["correlation"] = {"status": "none", "threat_level": "low"}
        
        

        # -----------------------------
        # Oracle AI
        # -----------------------------
        packet = self.oracle.investigate(packet)

        print()
        print("ORACLE CATEGORY")
        print(packet["oracle"]["category"])
        print()

        print("\n========== ORACLE OUTPUT ==========")
        print(packet["oracle"])
        print("===================================\n")

        print("\n========== OBSERVER OUTPUT ==========")
        print(packet["observer"])
        print("=====================================\n")
 
        if (
            packet["oracle"]["category"] == "Normal"
            and
            not packet["oracle"].get("requires_investigation", False)
        ):
            print("RETURNING EARLY")
            return packet

        print("GOING TO SENTINEL")

        # Ignore benign events
        if (
            packet["oracle"]["category"] == "Normal"
            and
            not packet["oracle"].get("requires_investigation", False)
        ):

            packet["completed"] = False

            return packet

        # -----------------------------
        # Sentinel AI
        # -----------------------------
        packet = self.sentinel.respond(packet)

        # -----------------------------
        # Incident Creation
        # -----------------------------
        packet = self.create(packet)

        packet["completed"] = True

        return packet

    def create(self, packet):

        incident_id = f"IM-{IncidentManager.counter:05d}"

        IncidentManager.counter += 1

        priority = packet["sentinel"]["priority"]
        priority = priority.upper()

        packet["sentinel"]["priority"] = priority

        # ----------------------------------------
        # Get Assignment
        # ----------------------------------------
        assignment = self.assignment.assign(priority)

        # ----------------------------------------
        # Build Incident
        # ----------------------------------------
        
        incident = {

            "incident_id": incident_id,

            # Complete Asset Object
            "asset": packet["asset"],

            # Complete Event
            "event": packet["event"],

            # Oracle Output
            "oracle": packet["oracle"],

            # Observer Output
            "observer": packet["observer"],

            "category": packet["oracle"]["category"],

            "severity": priority,

            "status": self.status.initial_status(priority),

            "assigned_team": assignment["team"],

            "assigned_owner": assignment["owner"],

            "created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            "history": self.history.build(packet),

            "observer_confidence": packet["observer"]["confidence"],

        }

        # ----------------------------------------
        # Determine next lifecycle state
        # ----------------------------------------
        incident["next_status"] = self.lifecycle.progress(
            incident
        )

        incident["asset_profile"] = self.asset_inventory.get(

            incident["asset"]["hostname"]

        )

        #----------------------------------------
        # Dependency Graph
        #----------------------------------------
        dependencies = self.dependency_graph.find_dependencies(incident["asset"]["hostname"])

        incident["blast_radius"] = (
            self.blast_radius.calculate(
                incident,
                dependencies
            )
        )

        # ----------------------------------------
        # Build Investigation Case
        # ----------------------------------------

        incident["case"] = self.case_manager.create(
            incident
        )

        incident["case_notes"] = self.case_notes.build(
            packet
        )

        incident["evidence"] = self.evidence.collect(
            packet
        )

        incident["tags"] = self.case_tags.generate(
            packet
        )

        incident["ioc_list"] = self.ioc_enrichment.enrich(packet)

        #incident["investigation_summary"] = self.summary.build(packet)

        incident = self.ioc_manager.process(incident)

        incident["investigation_summary"] = (
            self.summary.build(
                incident
            )
        )

        

        #incident["timeline"] = self.timeline.build(packet)

        incident["mitre_confidence"] = self.mitre_confidence.score(packet)

        incident["mitre"] = self.mitre_mapper.map(packet)

        incident["iocs"] = self.iocs.extract(
            packet
        )

        incident["attack_chain"] = (
            self.attack_chain.build(
                packet
            )
        )

        

        incident["timeline"] = self.timeline.build(incident)

        incident["analyst_actions"] = (
            self.analyst_actions.build(
                incident
            )
        )

        

        incident["evidence_chain"] = (
            self.evidence_chain.build(
                incident["evidence"]
            )
        )

        incident["activity_feed"] = (
            self.activity_feed.build(
                packet,
                incident
            )
        )

        # ----------------------------------------
        # Collaboration & Workflow
        # ----------------------------------------

        collaboration = self.collaboration.build(packet, incident)

        incident["analyst_comments"] = (
            collaboration["comments"]
        )

        incident["tasks"] = (
            collaboration["tasks"]
        )

        incident["approval"] = (
            collaboration["approval"]
        )


        incident["escalation"] = (
            collaboration["escalation"]
        )

        incident["sla"] = (
            collaboration["sla"]
        )

        incident["notifications"] = (
            collaboration["notifications"]
        )

        incident["audit_trail"] = (
            collaboration["audit"]
        )

        # ----------------------------------------
        # Recovery Status (depends on approval)
        # ----------------------------------------

        incident["recovery_status"] = (
            self.recovery_status.build(
                packet,
                incident
            )
        )

        # ----------------------------------------
        # Case Metrics (depends on approval)
        # ----------------------------------------

        incident["case_metrics"] = (
            self.case_metrics.build(
                packet,
                incident
            )
        )

        # ----------------------------------------
        # Digital Twin Simulation
        # ----------------------------------------

        incident["digital_twin"] = (
            self.digital_twin.simulate(
                incident
            )

        )

        #
        # Enterprise Brain
        #

        self.brain.remember(
            incident
        )

        incident["brain"] = {

            "history":

                self.brain.attack_history(

                    incident["asset"]["hostname"]

                ),

            "similar":

                self.brain.find_similar(

                    incident

                )

        }

        #
        # Cyber DNA
        #

        incident["cyber_dna"] = (

            self.cyber_dna.build(
                incident

            )

        )

        packet["incident"] = incident

        #
        # ORACLE 
        #

        packet = self.oracle.investigate(
            packet
        )

        #
        # Sentinel
        #

        packet = self.sentinel.respond(
            packet
        )

        # ----------------------------------------
        # Commander AI Analysis
        # ----------------------------------------
        commander_input = {
            **packet,
            **incident
        }

        incident["commander"] = (
            self.commander.analyze(
                commander_input
            )
        )

        packet.update(commander_input)

        incident = packet["incident"]

        # ----------------------------------------
        # Commander AI Council Summary
        # ----------------------------------------

        incident["council"] = incident["commander"]["ai_council"]



        

        # ----------------------------------------
        # AI Council
        # ----------------------------------------

        votes = []

        votes.append(

            self.oracle.vote(packet)

        )

        votes.append(

            self.commander.vote(incident)

        )

        votes.append(

            self.brain.vote(incident)

        )

        strategies = incident["commander"] \
            .get("strategic_analysis", {}) \
            .get("strategies", [])

        votes.append(

            self.digital_twin.vote(

                incident,

                incident["digital_twin"],

                strategies

            )

        )

        votes.append(

            self.sentinel.vote(

                incident

            )

        )

        print("\n========== VOTES ==========")

        from pprint import pprint

        for i, vote in enumerate(votes, start=1):
            print(f"\nVote {i}")
            pprint(vote)

        print("===========================\n")


        incident["council_debate"] = self.council.debate(votes)
        

        

        #
        # Oracle AI performs the final
        # enterprise investigation after
        # all AI modules have completed.
        #

        

        # ----------------------------------------
        # Store in packet
        # ----------------------------------------
        packet["incident"] = incident

        self.repository.add(incident)

        packet["incident_report"] = self.report.generate(
            incident
        )

    
        return packet
    
    