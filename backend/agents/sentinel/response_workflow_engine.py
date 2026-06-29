class ResponseWorkflowEngine:
    """
    Builds executable response workflows
    from Sentinel playbooks.
    """

    def build(self, decision):

        workflow = []

        actions = decision["playbook_actions"]

        for index, action in enumerate(actions, start=1):

            workflow.append({

                "step": index,

                "action": action,

                "status": "PENDING"

            })

        return workflow