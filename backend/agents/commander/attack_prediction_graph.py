from collections import defaultdict


class AttackPredictionGraph:
    """
    Enterprise Attack Prediction Graph

    Learns attack progression from incidents
    while providing sensible MITRE-based defaults.

    The graph evolves as AEGIS-X observes more
    incidents inside an enterprise.

    Edge Format
    -----------

    {
        "next": "...",
        "count": 17,
        "avg_minutes": 18,
        "confidence": 84
    }
    """

    def __init__(self):

        self.graph = defaultdict(dict)

        self._bootstrap()

    # -------------------------------------------------

    def _bootstrap(self):
        """
        Initial MITRE campaign knowledge.

        These are only starting values.

        Real enterprise incidents will
        continuously modify them.
        """

        self.add_edge(
            "Reconnaissance",
            "Credential Access",
            confidence=72,
            minutes=35
        )

        self.add_edge(
            "Reconnaissance",
            "Resource Development",
            confidence=46,
            minutes=50
        )

        self.add_edge(
            "Credential Access",
            "Privilege Escalation",
            confidence=84,
            minutes=18
        )

        self.add_edge(
            "Credential Access",
            "Lateral Movement",
            confidence=63,
            minutes=27
        )

        self.add_edge(
            "Privilege Escalation",
            "Credential Dumping",
            confidence=81,
            minutes=11
        )

        self.add_edge(
            "Privilege Escalation",
            "Defense Evasion",
            confidence=67,
            minutes=14
        )

        self.add_edge(
            "Credential Dumping",
            "Lateral Movement",
            confidence=88,
            minutes=9
        )

        self.add_edge(
            "Lateral Movement",
            "Domain Controller",
            confidence=73,
            minutes=17
        )

        self.add_edge(
            "Domain Controller",
            "Ransomware",
            confidence=62,
            minutes=21
        )

        self.add_edge(
            "Domain Controller",
            "Data Exfiltration",
            confidence=57,
            minutes=26
        )

        self.add_edge(
            "Ransomware",
            "Business Disruption",
            confidence=94,
            minutes=30
        )

    # -------------------------------------------------

    def add_edge(
        self,
        source,
        target,
        confidence,
        minutes
    ):

        self.graph[source][target] = {

            "count": 1,

            "confidence": confidence,

            "avg_minutes": minutes

        }

    # -------------------------------------------------

    def learn(
        self,
        source,
        target,
        duration_minutes
    ):
        """
        Learn from a completed incident.

        Every real incident strengthens
        or creates a campaign edge.
        """

        if target not in self.graph[source]:

            self.graph[source][target] = {

                "count": 1,

                "confidence": 55,

                "avg_minutes": duration_minutes

            }

            return

        edge = self.graph[source][target]

        edge["count"] += 1

        edge["avg_minutes"] = round(

            (

                edge["avg_minutes"]

                *

                (edge["count"] - 1)

                +

                duration_minutes

            )

            /

            edge["count"],

            1

        )

        current = edge["confidence"]

        improvement = min(
            5,
            edge["count"] * 0.5
        )

        edge["confidence"] = min(
            99,
            round(
                current + improvement,
                1
            )
        )

    # -------------------------------------------------

    def predict(
        self,
        stage,
        limit=3
    ):
        """
        Return historical attack transitions.

        This function DOES NOT consider
        enterprise-specific context.
        """

        predictions = []

        if stage not in self.graph:
            return predictions

        for nxt, edge in self.graph[stage].items():

            predictions.append({

                "stage": nxt,

                "graph_confidence":
                    edge["confidence"],

                "estimated_minutes":
                    edge["avg_minutes"],

                "observations":
                    edge["count"]

            })

        predictions.sort(

            key=lambda x: x["graph_confidence"],

            reverse=True

        )

        return predictions[:limit]

    # -------------------------------------------------

    def export(self):

        return self.graph