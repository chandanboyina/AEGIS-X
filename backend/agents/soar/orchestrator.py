from agents.soar.action_planner import ActionPlanner
from agents.soar.workflow_engine import WorkflowEngine
from agents.soar.executor import Executor


class SOAROrchestrator:

    def __init__(self):

        self.planner = ActionPlanner()

        self.workflow = WorkflowEngine()

        self.executor = Executor()

    def execute(
        self,
        playbook
    ):

        actions = self.planner.plan(
            playbook
        )

        workflow = self.workflow.build(
            actions
        )

        results = self.executor.execute(
            workflow
        )

        return {

            "actions": actions,

            "workflow": workflow,

            "results": results

        }