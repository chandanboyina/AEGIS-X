class GraphVote:
    """
    Enterprise Graph AI

    Independently evaluates every candidate playbook
    using attack graph characteristics.
    """

    def _score(
        self,
        playbook,
        graph_reasoning
    ):

        actions = playbook.get(
            "actions",
            {}
        )

        score = 50

        # ------------------------
        # Blocking attack stages
        # ------------------------

        blocked = len(
            actions.get(
                "block",
                []
            )
        )

        score += blocked * 10

        # ------------------------
        # Isolation
        # ------------------------

        isolated = len(
            actions.get(
                "isolate",
                []
            )
        )

        score += isolated * 6

        # ------------------------
        # Protection
        # ------------------------

        protected = len(
            actions.get(
                "protect",
                []
            )
        )

        score += protected * 4

        # ------------------------
        # Graph intelligence
        # ------------------------

        score += (
            len(
                graph_reasoning["critical_nodes"]
            ) * 2
        )

        score += (
            graph_reasoning["attack_depth"] * 3
        )

        score += (
            graph_reasoning["density"] * 10
        )

        score -= (
            graph_reasoning["components"] - 1
        ) * 5

        return round(score)

    def vote(
        self,
        playbooks,
        graph_reasoning
    ):

        ranking = []

        for playbook in playbooks:

            ranking.append({

                "playbook": playbook,

                "score": self._score(
                    playbook,
                    graph_reasoning
                )

            })

        ranking.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        best = ranking[0]

        return {

            "agent": "Graph AI",

            "recommendation":
                best["playbook"]["id"],

            "confidence":
                min(
                    95,
                    best["score"]
                ),

            "weight": 0.15,

            "reason": [

                f"Graph AI evaluated {len(playbooks)} playbooks.",

                f"Selected {best['playbook']['id']} using attack graph analysis.",

                f"{len(graph_reasoning['critical_nodes'])} critical attack stages.",

                f"Attack depth {graph_reasoning['attack_depth']}.",

                f"Graph density {graph_reasoning['density']:.2f}."

            ],

            "evidence": {

                "ranking": ranking,

                "graph": graph_reasoning

            }

        }