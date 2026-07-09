from agents.rag.retrieval import RetrievalEngine
from agents.knowledge_graph.knowledge_service import EnterpriseKnowledge


class RAGEngine:
    """
    Enterprise Threat Intelligence Engine.
    """

    def __init__(self):

        self.retriever = RetrievalEngine()

        self.knowledge = EnterpriseKnowledge()

    def analyze(
        self,
        incident,
        playbook=None
    ):

        intelligence = self.retriever.retrieve(
            incident
        )

        graph = self.knowledge.analyze(

            incident,

            playbook or "Unknown",

            intelligence["documents"]

        )

        return {

            "retrieved": intelligence,

            "knowledge_graph": graph,

            "summary": self.generate_summary(
                intelligence
            )

        }

    def generate_summary(
        self,
        intelligence
    ):

        docs = intelligence["documents"]

        if not docs:

            return "No external intelligence available."

        summary = []

        for doc in docs:

            summary.append(

                f"{doc['id']} - {doc['technique']}"

            )

        return "; ".join(summary)