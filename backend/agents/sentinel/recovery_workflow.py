class RecoveryWorkflow:
    """
    Builds a structured recovery workflow
    from the recovery plan.
    """

    def build(self, recovery_plan):

        workflow = []

        for step, action in enumerate(recovery_plan, start=1):

            workflow.append({

                "step": step,

                "action": action,

                "status": "SUCCESS"

            })

        return workflow