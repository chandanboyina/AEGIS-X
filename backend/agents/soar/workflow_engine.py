class WorkflowEngine:
    """
    Converts planned actions into an
    executable workflow.

    Future:
    - Parallel execution
    - Dependencies
    - Rollback
    """

    PRIORITY = {

        "CRITICAL": 1,

        "HIGH": 2,

        "MEDIUM": 3,

        "LOW": 4

    }

    def build(
        self,
        actions
    ):

        workflow = sorted(

            actions,

            key=lambda x: self.PRIORITY.get(

                x["priority"],

                5

            )

        )

        return workflow