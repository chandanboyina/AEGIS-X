class KnowledgeReasoner:
    """
    Reasons over enterprise
    cybersecurity relationships.
    """

    def explain(
        self,
        graph,
        mitre
    ):

        if not graph.exists(
            mitre
        ):

            return {

                "related": [],

                "summary":
                    "No knowledge available."

            }

        related = graph.neighbors(
            mitre
        )

        return {

            "related": related,

            "summary":

                f"{mitre} connected to "

                f"{len(related)} entities."

        }