import copy
from agents.commander.attack_graph_simulator import AttackGraphSimulator
from agents.commander.confidence_engine import ConfidenceEngine

class PlaybookSimulator:
    """
    Simulates the future state of the enterprise
    if a particular playbook is executed.

    This does NOT execute actions.

    It predicts:
        • Blast radius
        • Business loss
        • Recovery
        • Attack spread
        • Success probability
    """

    def __init__(self):
        self.graph = AttackGraphSimulator()

        self.confidence = ConfidenceEngine()

    def simulate(
        self,
        incident,
        playbook,
        digital_twin,
        outcome,
        attack_path,
        business_impact

    ):
        
        topology = copy.deepcopy(
            digital_twin
        )

        actions = playbook.get(
            "actions",
            {}
        )

        isolated = actions.get(
            "isolate",
            []
        )

        protected = actions.get(
            "protect",
            []
        )

        # Used in Attack Graph simulation
        blocked = actions.get(
            "block",
            []
        )

        # -----------------------------------
        # Historical Enterprise Knowledge
        # -----------------------------------

        history = outcome.get(
            "recommended",
            {
                "success_rate":70,

                "average_recovery":30,

                "average_loss":business_impact["estimated_loss_value"],

                "average_services_saved":2,

                "observations":0,

                "confidence":50

            }
        )

        historical_success = history["success_rate"]

        historical_recovery = history["average_recovery"]


        # Reserved for future confidence calibration
        historical_loss = history["average_loss"]

        services_saved = history["average_services_saved"]

        # -----------------------------------
        # Current Digital Twin State
        # -----------------------------------

        topology = self.apply_actions(
            topology,
            isolated,
            protected

        )

        spread = self.calculate_spread(topology)

        attack_graph = attack_path

        if isinstance(attack_path, dict):

            attack_graph = attack_path.get(
                "timeline",
                []
            )

        graph = self.graph.simulate(
            attack_graph,
            blocked,
            topology
        )

        #print("\n===== GRAPH DEBUG =====")
        #print("Blocked :", blocked)
        #print("Remaining :", graph["remaining_path"])
        #print("Removed :", graph["removed_stages"])
        #print("=======================\n")

        

        # -----------------------------------
        # Synchronize Attack Graph and
        # Digital Twin
        # -----------------------------------

        # -----------------------------------
        # Risk-weighted remaining spread
        # -----------------------------------

        risk_score = 0
        for service in spread:
            risk_score += service.get(
                "risk",
                1.0
            )

        remaining_attack = len(
            graph["remaining_path"]
        )

        predicted_spread = min(
            remaining_attack,
            len(spread)
        )

        predicted_spread = int(
            predicted_spread
        )

        if graph["stopped"]:
            predicted_spread = 0
        else:
            predicted_spread = len(spread)

        current_spread = len(
            digital_twin["spread"]
        )
        

        current_loss = business_impact[
            "estimated_loss_value"
        ]

        spread_ratio = (
            predicted_spread /
            max(
                current_spread,
                1
            )
        )
        
        graph_ratio = (
            graph["remaining_probability"] / 100
        )

        criticality = incident["asset_profile"].get(
            "criticality",
            "Medium"
        )

        criticality_multiplier = {
            "Low": 0.8,
            "Medium": 1.0,
            "High": 1.3,
            "Critical": 1.8

        }.get(
            criticality,
            1.0
        )

        loss_ratio = (
            0.7*spread_ratio+
            0.3*graph_ratio
        )

        estimated_loss = round(
        current_loss *
        loss_ratio,
        2
        )

        estimated_loss = max(

        0.05,

        min(

        estimated_loss,

        current_loss

        )

        )

        estimated_loss=min(
        current_loss,
        estimated_loss,
        )
        
        recovery_ratio = (
            predicted_spread /
            max(current_spread, 1)
        )

        estimated_recovery = max(
            5,
            round(
            historical_recovery *
            (
            predicted_spread /
            max(current_spread,1)
            ),
            1
            )
        )

        # -----------------------------------
        # Enterprise Confidence Engine
        # -----------------------------------

        similarity = 0

        if "enterprise_context" in incident:

            similar = incident["enterprise_context"].get(
                "similar_incident"
            )

            if similar:

                similarity = similar[
                    "analysis"
                ]["similarity"]

        confidence_result = self.confidence.calculate(

            history,

            similarity,

            incident.get(
                "enterprise_risk",
                60
            ),

            graph,

            predicted_spread,

            current_spread

        )


        

        if graph["stopped"]:
            spread_reason = (
                "Attack fully contained by selected playbook."
            )

        else:

            spread_reason = (
                f"Attack spread reduced from "
                f"{current_spread} to "
                f"{predicted_spread}."
            )

        removed_stage_names = [
            stage["stage"]
            if isinstance(stage, dict)
            else stage
            for stage in graph["removed_stages"]
        ]

        return {

            "playbook": playbook["id"],

            "strategy": playbook["id"],

            "success_probability": historical_success,

            "confidence":
                confidence_result["confidence"],

            "confidence_breakdown":
                confidence_result["breakdown"],

            "estimated_loss": estimated_loss,

            "estimated_recovery": estimated_recovery,

            "predicted_spread": predicted_spread,

            "services_saved": services_saved,

            "graph": graph,

            "topology": topology,

            "blocked": blocked,


            "reasoning": [

                f"Isolated {len(isolated)} services.",

                f"Protected {len(protected)} services.",

                spread_reason,

                f"Attack graph reduced to {len(graph['remaining_path'])} stages.",

                f"Blocked stages: "
                f"{', '.join(removed_stage_names) if removed_stage_names else 'None'}",

                f"Estimated financial loss ₹{estimated_loss} Cr.",

                f"Historical success {historical_success}%."

            ]

        }
    
    def apply_actions(
        self,
        topology,
        isolated,
        protected
    ):

        updated = []
        for service in topology["spread"]:
            service = service.copy()
            service["isolated"] = (
                service["service"]
                in isolated
            )
            service["protected"] = (
                service["service"]
                in protected
            )
            updated.append(service)
        topology["spread"] = updated
        return topology
    

    def calculate_spread(
        self,
        topology
    ):
        """
        Determine which services remain compromised
        after the playbook actions.

        Rules

        • Isolated services are removed.
        • Protected services remain but with lower risk.
        • Active services remain unchanged.
        """

        active = []

        for service in topology["spread"]:

            current = service.copy()

            # -------------------------
            # Isolated services
            # Completely removed
            # -------------------------

            if current.get("isolated", False):
                continue

            # -------------------------
            # Protected services
            # Lower compromise risk
            # -------------------------

            if current.get("protected", False):

                current["risk"] = 0.25

            else:

                current["risk"] = 1.0

            active.append(current)

        return active
    
    def evaluate(
        self,
        incident,
        playbook,
        digital_twin,
        outcome,
        attack_path,
        business_impact
    ):
        """
        Public API used by every AI agent.

        Returns the simulated enterprise state.
        """

        return self.simulate(

            incident,

            playbook,

            digital_twin,

            outcome,

            attack_path,

            business_impact

        )
    
    def evaluate_all(
        self,
        incident,
        playbooks,
        digital_twin,
        outcomes,
        attack_path,
        business_impact
    ):
        """
        Simulate every playbook.

        Returns simulations sorted by quality.
        """

        results = []

        for playbook in playbooks:

            history = outcomes.get(
                playbook["id"],
                {
                    "recommended": {
                        "success_rate": 70,
                        "average_recovery": 30,
                        "average_loss": business_impact["estimated_loss_value"],
                        "average_services_saved": 2,
                        "average_blast_reduction": 1,
                        "confidence": 60,
                        "observations": 0,
                        "reputation": 50,
                        "average_analyst_rating": 5
                    }
                }
            )

            simulation = self.evaluate(

                incident,

                playbook,

                digital_twin,

                history,

                attack_path,

                business_impact

            )

            results.append(simulation)

        results.sort(

            key=lambda x: (

                x["estimated_loss"],

                x["predicted_spread"],

                -x["success_probability"]

            )

        )

        return results