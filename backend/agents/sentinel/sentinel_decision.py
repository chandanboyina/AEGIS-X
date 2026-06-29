from agents.sentinel.recovery_planner import RecoveryPlanner
from agents.sentinel.containment_engine import ContainmentEngine
from agents.sentinel.playbook_engine import PlaybookEngine
from agents.sentinel.response_workflow_engine import ResponseWorkflowEngine
from agents.sentinel.workflow_executor import WorkflowExecutor
from agents.sentinel.recovery_workflow import RecoveryWorkflow
from agents.sentinel.business_impact import BusinessImpact



class SentinelDecision:
    """
    Determines enterprise response actions.
    """

    def __init__(self):

        self.playbooks = PlaybookEngine()

        self.containment = ContainmentEngine()

        self.recovery = RecoveryPlanner()

        self.workflow = ResponseWorkflowEngine()

        self.executor = WorkflowExecutor()

        self.recovery_workflow = RecoveryWorkflow()

        self.business_impact = BusinessImpact()

    def decide(self, packet):

        oracle = packet["oracle"]

        category = oracle["category"]

        threat = oracle["threat_level"]

        # ----------------------------------------
        # Playbook
        # ----------------------------------------
        playbook = self.playbooks.get_playbook(
            category
        )

        # ----------------------------------------
        # Containment
        # ----------------------------------------
        containment = self.containment.contain(
            packet
        )

        # ----------------------------------------
        # Recovery Plan
        # ----------------------------------------
        recovery = self.recovery.recover(
            category
        )

        #----------------------------------------
        # Business Impact Assessment
        #----------------------------------------

        impact = self.business_impact.assess(
            packet
        )

        # ----------------------------------------
        # Response Workflow
        # ----------------------------------------
        response_workflow = self.workflow.build({

            "playbook_actions": playbook["actions"]

        })

        response_workflow = self.executor.execute(
            response_workflow
        )

        # ----------------------------------------
        # Recovery Workflow
        # ----------------------------------------
        recovery_workflow = self.recovery_workflow.build(
            recovery
        )

        # ----------------------------------------
        # Default Response
        # ----------------------------------------
        action = "Monitor"

        priority = "LOW"

        if category == "Reconnaissance":

            action = "Increase Monitoring"

            priority = "MEDIUM"

        elif category == "Credential Access":

            action = "Lock Account"

            priority = "HIGH"

        elif category == "Privilege Escalation":

            action = "Disable Privileged Account"

            priority = "CRITICAL"

        elif category == "Malware":

            action = "Isolate Endpoint"

            priority = "CRITICAL"

        elif category == "Ransomware":

            action = "Disconnect Host"

            priority = "CRITICAL"

        return {

            "action": action,

            "priority": priority,

            "playbook": playbook["name"],

            "playbook_actions": playbook["actions"],

            # Response workflow
            "workflow": response_workflow,

            # Containment
            "containment": containment,

            # Recovery
            "recovery": recovery,

            # Recovery workflow
            "recovery_workflow": recovery_workflow,

            # Business Impact
            "business_impact": impact,

            "threat_level": threat,

        }