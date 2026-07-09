from collections import defaultdict


class KnowledgeGraph:
    """
    Enterprise Cyber Knowledge Graph.

    Stores relationships between:

    • MITRE
    • Playbooks
    • Assets
    • CVEs
    • Historical Incidents
    """

    def __init__(self):

        self.graph = defaultdict(set)

    def add_relation(
        self,
        source,
        target
    ):

        self.graph[source].add(target)

        self.graph[target].add(source)

    def neighbors(
        self,
        node
    ):

        return list(
            self.graph.get(
                node,
                []
            )
        )

    def exists(
        self,
        node
    ):

        return node in self.graph

    def size(self):

        return len(
            self.graph
        )