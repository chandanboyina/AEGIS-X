import random


class WorkflowExecutor:
    """
    Executes a Sentinel response workflow by
    updating each workflow step.
    """

    def execute(self, workflow):

        for step in workflow:

            step["status"] = "SUCCESS"

            step["duration"] = random.randint(1, 3)

        return workflow