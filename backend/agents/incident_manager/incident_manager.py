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

        

    def create(self, packet):

        incident_id = f"IM-{IncidentManager.counter:05d}"

        IncidentManager.counter += 1

        priority = packet["sentinel"]["priority"]

        # ----------------------------------------
        # Get Assignment
        # ----------------------------------------
        assignment = self.assignment.assign(priority)

        # ----------------------------------------
        # Build Incident
        # ----------------------------------------
        incident = {

            "incident_id": incident_id,

            "asset": packet["asset"]["hostname"],

            "category": packet["oracle"]["category"],

            "severity": priority,

            "status": self.status.initial_status(
                priority
            ),

            "assigned_team": assignment["team"],

            "assigned_owner": assignment["owner"],

            "created": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

            "history": self.history.build(
                packet
            )

        }

        # ----------------------------------------
        # Determine next lifecycle state
        # ----------------------------------------
        incident["next_status"] = self.lifecycle.progress(
            incident
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
        # Store in packet
        # ----------------------------------------
        packet["incident"] = incident

        self.repository.add(incident)

        packet["incident_report"] = self.report.generate(
            incident
        )

        return packet