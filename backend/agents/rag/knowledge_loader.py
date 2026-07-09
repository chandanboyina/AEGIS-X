from agents.rag.mitre_loader import MITRELoader


class KnowledgeLoader:
    """
    Unified interface to all
    enterprise threat intelligence.
    """

    def __init__(self):

        self.mitre = MITRELoader()

    def search(
        self,
        mitre=None,
        keyword=None
    ):

        results = {}
        # Use dictionary keyed by technique ID to remove duplicates

        if mitre:

            for doc in self.mitre.search(
                technique_id=mitre
            ):
                results[doc["id"]] = doc

        if keyword:

            for doc in self.mitre.search(
                keyword=keyword
            ):
                results[doc["id"]] = doc

        return list(results.values())