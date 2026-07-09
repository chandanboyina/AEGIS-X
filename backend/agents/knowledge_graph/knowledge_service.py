from agents.knowledge_graph.builder import (
    KnowledgeGraphBuilder
)

from agents.knowledge_graph.reasoner import (
    KnowledgeReasoner
)


class EnterpriseKnowledge:

    def __init__(self):

        self.builder = KnowledgeGraphBuilder()

        self.reasoner = KnowledgeReasoner()

    def analyze(

        self,

        incident,

        playbook,

        intelligence

    ):

        graph = self.builder.build(

            incident,

            playbook,

            intelligence

        )

        return self.reasoner.explain(

            graph,

            incident["mitre"]["id"]

        )