class RollbackReport:
    """
    Generates rollback report.
    """

    def generate(self, rollback):

        if not rollback:

            return {

                "required": False,

                "actions": []

            }

        return {

            "required": True,

            "actions": rollback

        }