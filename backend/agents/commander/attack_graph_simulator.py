import copy

class AttackGraphSimulator:
    """
    Simulates how the attack graph changes
    after a playbook modifies the Digital Twin.
    """

    import copy


class AttackGraphSimulator:

    def simulate(
        self,
        attack_path,
        blocked_stages,
        topology

    ):

        graph = copy.deepcopy(attack_path)
        remaining = []
        removed = []
        blocked = False
        for node in graph:

            # ------------------------------
            # Support both dict and string
            # ------------------------------

            if isinstance(node, dict):
                stage = node["stage"]

            else:
                stage = node

            # ------------------------------
            print("\n===== ATTACK GRAPH DEBUG =====")
            print("Current Stage :", stage)
            print("Blocked List  :", blocked_stages)
            print("==============================")

            stage = stage.strip().lower()
            blocked = [
            s.strip().lower()
            for s in blocked_stages
            ]

            if stage in blocked:
                blocked = True

            if blocked:
                removed.append(node)

            else:
                remaining.append(node)

        return {

            "remaining_path": remaining,

            "removed_stages": removed,

            "stopped": blocked,

            "remaining_probability": round(

                len(remaining)
                /
                max(
                    len(graph),
                    1
                )
                *100
            )
        }