from agents.soar.integration_selector import IntegrationSelector

class ActionPlanner:
    """
    Converts playbook actions into executable
    SOAR actions.
    """

    def __init__(self):

        self.selector = IntegrationSelector()

    def plan(
        self,
        playbook
    ):

        actions = []

        pb = playbook.get(
            "actions",
            {}
        )

        for asset in pb.get(
            "block",
            []
        ):

            actions.append({

                "type": "BLOCK",

                "target": asset,

                "integration": self.selector.select(
                    "BLOCK",
                    asset
                ),

                "priority": "CRITICAL"

            })

        for asset in pb.get(
            "isolate",
            []
        ):

            actions.append({

                "type": "ISOLATE",

                "target": asset,

                "integration": self.selector.select(
                    "ISOLATE",
                    asset
                ),

                "priority": "HIGH"

            })

        for asset in pb.get(
            "protect",
            []
        ):

            actions.append({

                "type": "PROTECT",

                "target": asset,

                "integration": self.selector.select(
                    "PROTECT",
                    asset
                ),

                "priority": "MEDIUM"

            })

        return actions