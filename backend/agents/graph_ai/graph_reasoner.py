from agents.graph_ai.graph_metrics import GraphMetrics


class GraphReasoner:

    def __init__(self):

        self.metrics = GraphMetrics()

    def explain(
        self,
        graph
    ):

        importance = self.metrics.node_importance(
            graph
        )

        degree = self.metrics.degree(
            graph
        )

        return {

            "critical_nodes":
                sorted(
                    importance.items(),
                    key=lambda x: x[1],
                    reverse=True
                ),

            "connections":
                degree,
            "density":
                self.metrics.density(
                    graph
                ),

            "average_degree":
                self.metrics.average_degree(
                    graph
                ),

            "attack_depth":
                self.metrics.attack_depth(
                    graph
                ),

            "components":
                self.metrics.connected_components(
                    graph
                )

        }