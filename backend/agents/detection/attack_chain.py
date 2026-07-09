from agents.oracle.attack_chain_builder import AttackChainBuilder


class DetectionAttackChain:
    """
    Wrapper around Oracle Attack Chain Builder.

    Oracle remains the single source
    of truth.
    """

    def __init__(self):

        self.builder = AttackChainBuilder()

    def build(
        self,
        campaign
    ):

        return self.builder.build(
            campaign
        )