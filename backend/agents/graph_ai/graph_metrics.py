import networkx as nx


class GraphMetrics:

    """
    Enterprise Graph Analytics
    """

    def shortest_path(
        self,
        graph,
        source,
        target
    ):

        try:

            return nx.shortest_path(
                graph,
                source,
                target
            )

        except Exception:

            return []

    def node_importance(
        self,
        graph
    ):

        return nx.betweenness_centrality(
            graph
        )

    def degree(
        self,
        graph
    ):

        return dict(
            graph.degree()
        )

    # ---------------------------
    # NEW
    # ---------------------------

    def density(
        self,
        graph
    ):

        return nx.density(graph)

    def average_degree(
        self,
        graph
    ):

        degree = dict(graph.degree())

        if not degree:

            return 0

        return sum(
            degree.values()
        ) / len(degree)

    def attack_depth(
        self,
        graph
    ):

        if graph.number_of_nodes() == 0:

            return 0

        return nx.dag_longest_path_length(
            graph
        )

    def connected_components(
        self,
        graph
    ):

        return nx.number_weakly_connected_components(
            graph
        )