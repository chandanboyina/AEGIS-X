import random


class RollbackExecutor:
    """
    Executes rollback actions.
    """

    def execute(self, rollback):

        for action in rollback:

            action["status"] = "SUCCESS"

            action["duration"] = random.randint(1, 3)

        return rollback