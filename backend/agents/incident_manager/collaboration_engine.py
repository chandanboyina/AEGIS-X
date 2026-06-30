from agents.incident_manager.analyst_comments import AnalystComments
from agents.incident_manager.task_manager import TaskManager
from agents.incident_manager.approval_engine import ApprovalEngine
from agents.incident_manager.escalation_engine import EscalationEngine
from agents.incident_manager.sla_tracker import SLATracker
from agents.incident_manager.notification_engine import NotificationEngine
from agents.incident_manager.audit_trail import AuditTrail


class CollaborationEngine:
    """
    Central collaboration manager.
    """

    def __init__(self):

        self.comments = AnalystComments()

        self.tasks = TaskManager()

        self.approvals = ApprovalEngine()

        self.escalation = EscalationEngine()

        self.sla = SLATracker()

        self.notifications = NotificationEngine()

        self.audit = AuditTrail()

    def build(self, packet, incident):

        return {

            "comments":
                self.comments.build(packet, incident),

            "tasks":
                self.tasks.build(packet, incident),

            "approval":
                self.approvals.build(packet, incident),

            "escalation":
                self.escalation.build(packet, incident),

            "sla":
                self.sla.build(packet, incident),

            "notifications":
                self.notifications.build(packet, incident),

            "audit":
                self.audit.build(packet, incident)

        }