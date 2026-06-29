class SentinelReport:
    """
    Generates Sentinel AI response reports.
    """

    def generate(self, packet):

        sentinel = packet["sentinel"]

        oracle = packet["oracle"]

        workflow = sentinel["workflow"]

        # Determine overall execution status
        if all(step["status"] == "SUCCESS" for step in workflow):
            status = "EXECUTED"

        elif any(step["status"] == "FAILED" for step in workflow):
            status = "PARTIALLY EXECUTED"

        else:
            status = "PENDING"

        return {

            "title": "Sentinel AI Response",

            "asset":
                packet["asset"]["hostname"],

            "threat":
                oracle["category"],

            "response":
                sentinel["action"],

            "playbook":
                sentinel["playbook"],

            "playbook_actions":
                sentinel["playbook_actions"],

            "workflow":
                workflow,

            "containment":
                sentinel["containment"],

            "rollback":
                sentinel["rollback"],

            "recovery_workflow":
                sentinel["recovery_workflow"],

            "recovery":
                sentinel["recovery"],

            "business_impact":
                sentinel["business_impact"],

            "priority":
                sentinel["priority"],

            "status":
                status

        }