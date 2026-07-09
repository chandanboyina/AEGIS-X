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

        reason_parts = []

        reason_parts.append(

            f"Oracle classified the incident as {category}."

        )

        reason_parts.append(

            f"Threat level assessed as {threat}."

        )

        reason_parts.append(

            f"Recommended action: {action}."

        )

        reason_parts.append(

            f"Playbook: {playbook['name']}."

        )

        reason_parts.append(

            f"Business impact: {impact['impact']}."

        )

        containment_actions = []

        if containment["block_ip"]:
            containment_actions.append("Blocked malicious IP")

        if containment["lock_account"]:
            containment_actions.append("Locked compromised account")

        if containment["isolate_host"]:
            containment_actions.append("Isolated affected host")

        if containment["collect_memory"]:
            containment_actions.append("Memory acquisition scheduled")

        if containment["collect_disk"]:
            containment_actions.append("Disk acquisition scheduled")

        if containment["disable_shares"]:
            containment_actions.append("Disabled network shares")

        if containment_actions:

            reason_parts.append(

                "Containment actions: "

                + ", ".join(containment_actions)

                + "."

            )

        else:

            reason_parts.append(

                "No containment action required."

            )

        reasoning = reason_parts

        return {

            "action": action,

            "priority": priority,

            "confidence": self.calculate_confidence(

                threat,

                priority

            ),

            "reasoning": reasoning,

            #"playbook": playbook["name"],

            "playbook": playbook["id"],

            "playbook_name": playbook["name"],

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
    
    def calculate_confidence(

        self,

        threat,

        priority

    ):

        score = 70

        if priority == "MEDIUM":

            score += 10

        elif priority == "HIGH":

            score += 18

        elif priority == "CRITICAL":

            score += 25

        if threat == "High":

            score += 5

        elif threat == "Critical":

            score += 10

        return min(score, 99)
    