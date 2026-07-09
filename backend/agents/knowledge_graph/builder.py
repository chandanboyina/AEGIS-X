from agents.knowledge_graph.graph import KnowledgeGraph


class KnowledgeGraphBuilder:
    """
    Builds enterprise relationships.
    """

    def __init__(self):

        self.graph = KnowledgeGraph()

    def build(
        self,
        incident,
        playbook,
        intelligence
    ):

        mitre = incident["mitre"]["id"]

        category = incident["category"]

        asset = incident["asset"]["hostname"]

        self.graph.add_relation(

            mitre,

            category

        )

        self.graph.add_relation(

            category,

            asset

        )

        self.graph.add_relation(

            mitre,

            playbook

        )

        for doc in intelligence:

            self.graph.add_relation(

                mitre,

                doc["technique"]

            )

        return self.graph