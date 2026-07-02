import networkx as nx


class AttackGraphAI:

    """
    Enterprise Graph AI

    Builds an attack graph from MITRE stages
    and enterprise relationships.
    """

    def __init__(self):

        self.graph = nx.DiGraph()

    def build(self, timeline):

        self.graph.clear()

        previous = None

        for node in timeline:

            if isinstance(node, dict):

                stage = node["stage"]

            else:

                stage = node

            self.graph.add_node(stage)

            if previous:

                self.graph.add_edge(
                    previous,
                    stage
                )

            previous = stage

        return self.graph