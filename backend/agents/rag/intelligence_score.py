class IntelligenceScore:
    """
    Calculates how well a playbook matches
    current threat intelligence.
    """

    def score(

        self,

        playbook,

        intelligence

    ):

        score = 0

        docs = intelligence["retrieved"]["documents"]

        graph = intelligence["knowledge_graph"]

        # -----------------------------
        # MITRE evidence
        # -----------------------------

        if docs:

            score += 25

        # -----------------------------
        # Graph connections
        # -----------------------------

        score += len(
            graph["related"]
        ) * 5

        # -----------------------------
        # Playbook explicitly connected
        # -----------------------------

        if playbook["id"] in graph["related"]:

            score += 30

        return min(
            score,
            100
        )