class GraphQuery:
    """
    Query Engine for Enterprise Knowledge Graph.
    """

    def __init__(self, graph):

        self.graph = graph

    def assets_for_user(self, username):

        assets = []

        for edge in self.graph.neighbors(username):

            if edge["relation"] == "LOGGED_INTO":

                assets.append(edge["target"])

        return assets

    def iocs_for_asset(self, asset):

        iocs = []

        for edge in self.graph.neighbors(asset):

            if edge["relation"] == "HAS_IOC":

                iocs.append(edge["target"])

        return iocs

    def services_for_asset(self, asset):

        services = []

        for edge in self.graph.neighbors(asset):

            if edge["relation"] == "USES":

                services.append(edge["target"])

        return services