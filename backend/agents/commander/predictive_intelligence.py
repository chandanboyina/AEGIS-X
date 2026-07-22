from agents.commander.playbook_simulator import PlaybookSimulator
from core.brain_service import brain
from agents.commander.timeline_simulator import TimelineSimulator
from agents.graph_ai.attack_graph_ai import AttackGraphAI
from agents.graph_ai.graph_reasoner import GraphReasoner
from agents.knowledge_graph.playbook_repository import PlaybookRepository


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

        print("\n===== PLAYBOOK DEBUG =====")
        print("Category :", incident["category"])
        print("Recommendation :", recommendation)
        print("==========================")

        repo = PlaybookRepository()

        templates = repo.candidates(
            incident["category"]
        )

        if not templates:
            return {
                "recommended": recommendation.get("recommended"),
                "strategies": [],
                "reason": "No playbook required for Normal category."
            }

        print("Templates Found :", len(templates))
        print(templates)

        

        if recommendation is None:

            return {

                "recommended": None,

                "strategies": []

            }
        
        ranking = recommendation.get(
            "ranking",
            []
        )

        # ------------------------------------
        # No historical ranking yet
        # Evaluate every template once
        # ------------------------------------

        if len(ranking) == 0:

            for template in templates:

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

        # ------------------------------------
        # Historical ranking exists
        # Evaluate ranked playbooks only
        # ------------------------------------

        else:

            

            for playbook in ranking:

                playbook_template = playbook["playbook"]

                if playbook_template is None:
                    continue

                #
                # Temporary candidate wrapper
                #

                template = playbook["playbook"]

                if isinstance(template, dict):

                    playbook_id = template["id"]

                else:

                    playbook_id = template

                candidate = {

                    "candidate_id":
                        playbook_id,

                    "base_playbook":
                        playbook_id,

                    "strategy":
                        "Historical",

                    "playbook":
                        template,

                    "metrics": {

                        "graph_bias":0,

                        "business_bias":0,

                        "brain_bias":0,

                        "risk_bias":0,

                        "predictive_bias":0

                    }

                }

                simulated = self.simulator.simulate(

                    incident,

                    candidate,

                    digital_twin,

                    {
                        "recommended": playbook
                    },

                    time_machine,

                    business

                )

                strategies.append(
                    simulated
                )

        strategies.sort(

            key=lambda x: (
                x["estimated_loss"],
                -x["success_probability"]
            )
        )

        #
        # Enterprise safety
        #

        if not strategies:

            return {

                "recommended": None,

                "strategies": [],

                "timeline": [],

                "graph_analysis": {}

            }

        

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
    
    def vote(self, strategy):

        #recommendation = (
        #    strategy.get("candidate_id")
        #    or (
        #        f"{strategy['playbook']}-{strategy['strategy']}"
        #        if strategy.get("strategy")
        #        else strategy.get("playbook")
        #    )
        #    or "Investigate"
        #)

        recommendation = strategy["candidate_id"]

        return {

            "agent": "Predictive",

            "recommendation": recommendation,

            "confidence": strategy.get("confidence", 0),

            "weight": 0.20,

            "reason": strategy.get("reasoning", []),

            "evidence": {

                "loss":
                    strategy.get("estimated_loss"),

                "spread":
                    strategy.get("predicted_spread"),

                "strategy":
                    strategy.get("strategy"),

                "success":
                    strategy.get("success_probability")

            }

        }
    