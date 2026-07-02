from agents.commander.playbook_simulator import PlaybookSimulator
from core.brain_service import brain
from agents.commander.timeline_simulator import TimelineSimulator
from agents.graph_ai.attack_graph_ai import AttackGraphAI
from agents.graph_ai.graph_reasoner import GraphReasoner


class PredictiveIntelligence:
    """
    Strategic Decision Intelligence

    Simulates multiple response strategies
    before Commander makes a decision.

    Uses existing intelligence:

    • Enterprise Brain
    • Digital Twin
    • Time Machine
    • Business Impact
    • Enterprise Risk
    """
    def __init__(self):
        self.simulator = PlaybookSimulator()

        self.timeline = TimelineSimulator()

        self.graph_ai = AttackGraphAI()

        self.graph_reasoner = GraphReasoner()

    def evaluate(

        self,

        incident,

        enterprise_risk,

        business,

        digital_twin,

        time_machine

    ):
        
        strategies = []

        recommendation = brain.get_playbook(
            incident
        )

        templates = brain.get_playbook_templates(
            incident
        )

        if recommendation is None:

            return {

                "recommended": None,

                "strategies": []

            }
        
        ranking = recommendation.get("ranking", [])

        # ------------------------------------
        # No historical ranking yet
        # ------------------------------------

        for template in templates:

            history = None

            if recommendation:

                for item in recommendation.get(
                    "ranking",
                    []
                ):
                    if item["playbook"] == template["id"]:
                        history = item
                        break

            if history is None:

                history = {
                    "success_rate": 70,
                    "average_recovery": 30,
                    "average_loss": business["estimated_loss_value"],
                    "average_services_saved": 2,
                    "average_blast_reduction": 1,
                    "confidence": 60,
                    "observations": 0,
                    "reputation": 50,
                    "average_analyst_rating": 5
                }

            simulated = self.simulator.simulate(
                incident,
                template,
                digital_twin,
                {
                    "recommended": history
                },
                time_machine,
                business
            )

            strategies.append(
                simulated
            )

            print(
                len(strategies)
            )
        # ------------------------------------
        # Historical ranking exists
        # ------------------------------------

        else:

            

            for playbook in ranking:

                playbook_template = brain.get_playbook_by_id(
                    playbook["playbook"]
                )

                if playbook_template is None:
                    continue

                simulated = self.simulator.simulate(
                    incident,
                    playbook_template,
                    digital_twin,
                    {

                        "recommended": playbook

                    },

                    time_machine,
                    business
                )

                strategies.append(simulated)

        strategies.sort(

            key=lambda x: (
                x["estimated_loss"],
                -x["success_probability"]
            )
        )

        attack_graph = self.graph_ai.build(
            time_machine["timeline"]
        )

        graph_analysis = self.graph_reasoner.explain(
            attack_graph
        )

        best = strategies[0]

        best["graph_ai"] = graph_analysis

        timeline = self.timeline.simulate(

            incident,

            best["graph"]["remaining_path"],

            digital_twin,

            business,

            best

        )

        return {

            "recommended": best,

            "strategies": strategies,

            "timeline": timeline,

            "graph_analysis": graph_analysis
        }
    
    def vote(
        self,
        strategy
    ):

        return {

            "agent":"Predictive",

            "recommendation":
                strategy["playbook"],

            "confidence":
                strategy["confidence"],

            "weight":0.20,

            "reason":
                strategy["reasoning"],

            "evidence":{

                "loss":
                    strategy["estimated_loss"],

                "spread":
                    strategy["predicted_spread"]

            }

        }

    