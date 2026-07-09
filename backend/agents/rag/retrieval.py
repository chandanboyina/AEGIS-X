from agents.rag.knowledge_loader import KnowledgeLoader


class RetrievalEngine:
    """
    Retrieves cybersecurity intelligence
    from all enterprise knowledge sources.
    """

    def __init__(self):

        self.knowledge = KnowledgeLoader()

    def retrieve(
        self,
        incident
    ):

        mitre = incident.get(
            "mitre",
            {}
        )

        category = incident.get(
            "category",
            ""
        )

        technique = self.knowledge.search(

            mitre=mitre.get("id"),

            keyword=category

        )

        return {

            "documents": technique,

            "count": len(
                technique
            )

        }