class GraphExplainer:

    def explain(
        self,
        commander
    ):

        strategy = commander["strategic_analysis"]["recommended"]

        graph = strategy["graph"]

        return {

            "remaining_stages": len(
                graph["remaining_path"]
            ),

            "removed_stages": graph["removed_stages"],

            "stopped": graph["stopped"],

            "reasoning": [

                f"{len(graph['removed_stages'])} attack stage(s) removed.",

                f"{len(graph['remaining_path'])} stage(s) remain."

            ]

        }