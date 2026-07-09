from datetime import datetime, timedelta

from core.brain_service import brain
from agents.commander.attack_prediction_graph import AttackPredictionGraph


class EnterpriseTimeMachine:
    """
    Enterprise Time Machine

    Predicts how an attack is likely to evolve
    using Enterprise Cyber Brain intelligence.

    Version 1:
        • Historical incidents
        • Enterprise Risk
        • MITRE stage progression
        • Similar incidents

    Future:
        • Graph traversal
        • Live telemetry
        • Reinforcement learning
    """

    

    def __init__(self):

        self.brain = brain

        self.attack_graph = AttackPredictionGraph()

    def _estimate_delay(
        self,
        enterprise_risk,
        history_count
    ):
        """
        Estimate minutes until next stage.
        Higher enterprise risk generally means
        faster attacker progression.
        """

        score = enterprise_risk["enterprise_score"]

        base = 30

        if score >= 90:
            base = 10

        elif score >= 75:
            base = 15

        elif score >= 60:
            base = 25

        reduction = min(history_count, 10)

        minutes = max(5, base - reduction)

        return minutes

    def _confidence_breakdown(
        self,
        incident,
        graph_confidence,
        enterprise_risk,
        similarity
    ):
        """
        Dynamic confidence calculation.

        This DOES NOT modify the graph.

        It evaluates the current incident only.
        """

        breakdown = {}

        breakdown["graph"] = graph_confidence

        breakdown["enterprise_risk"] = \
            enterprise_risk["enterprise_score"]

        breakdown["similarity"] = similarity

        breakdown["mitre"] = incident.get(
            "mitre_confidence",
            70
        )

        breakdown["ioc_density"] = min(
            100,
            len(
                incident["ioc_list"]
            ) * 8
        )

        breakdown["behavior"] = incident.get(
            "observer_confidence",
            60
        )

        weights = {

            "graph":0.25,

            "enterprise_risk":0.20,

            "similarity":0.15,

            "mitre":0.15,

            "ioc_density":0.15,

            "behavior":0.10

        }

        score = 0

        for key,value in breakdown.items():

            score += value * weights[key]

        breakdown["final"] = min(

            99,

            round(score)

        )

        return breakdown

    def predict(
        self,
        incident,
        enterprise_risk,
        simulated_graph=None
    ):

        current = incident["category"]

        similar = self.brain.find_similar(
            incident
        )

        similarity = 0

        if similar:

            similarity = similar[
                "analysis"
            ]["similarity"]

        history = self.brain.attack_history(

            incident["asset"]["hostname"]

        )

        history_count = len(history)

        if simulated_graph:
            campaign = []
            for stage in simulated_graph["remaining_path"]:
                campaign.append({
                    "stage": stage,

                    "graph_confidence": 90,

                    "estimated_minutes": 15,

                    "observations": 1
                })

        else:

            campaign = self.attack_graph.predict(
                current
            )

        predictions = []

        now = datetime.now()

        for node in campaign:

            confidence = self._confidence_breakdown(

                incident,

                node["graph_confidence"],

                enterprise_risk,

                similarity

            )

            eta = max(

                5,

                int(

                    node["estimated_minutes"]

                    -

                    history_count

                )

            )

            now += timedelta(

                minutes=eta

            )

            predictions.append({

                "stage":

                    node["stage"],

                "time":

                    now.strftime("%H:%M"),

                "eta_minutes":

                    eta,

                "probability":

                    confidence["final"],

                "confidence":

                    confidence,

                "observations":

                    node["observations"],

                "reasoning":[

                    f"Observed in {node['observations']} previous campaigns.",

                    f"Historical graph confidence {node['graph_confidence']}%.",

                    f"Enterprise risk {enterprise_risk['enterprise_score']}/100.",

                    f"Similarity score {similarity}%."

                ]

            })

        return {

            "current_stage":

                current,

            "history":

                history_count,

            "similarity":

                similarity,

            "timeline":

                predictions

        }