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
        candidate,
        digital_twin,
        outcome,
        attack_path,
        business_impact

    ):
        
        topology = copy.deepcopy(
            digital_twin
        )

        playbook = candidate["playbook"]

        metrics = candidate["metrics"]

        strategy = candidate["strategy"]

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

        services_saved = max(
            services_saved,
            len(graph["removed_stages"])
        )


        #print("\n===== GRAPH DEBUG =====")
        #print("Blocked :", blocked)
        #print("Remaining :", graph["remaining_path"])
        #print("Removed :", graph["removed_stages"])
        #print("=======================\n")

        

        # -----------------------------------
        # Risk-weighted remaining spread
        # -----------------------------------

        risk_score = 0
        for service in spread:
            risk_score += service.get(
                "risk",
                1.0
            )

        # -----------------------------------
        # Synchronize Attack Graph and
        # Digital Twin
        # -----------------------------------

        remaining_attack = len(
            graph["remaining_path"]
        )

        remaining_services = len(
            spread
        )

        # Both graph and digital twin agree

        predicted_spread = min(

            remaining_attack,

            remaining_services

        )

        # If attack graph is completely removed,
        # enterprise spread is also removed.

        if (
            graph["stopped"]
            or
            remaining_attack == 0
        ):

            predicted_spread = 0

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

        loss_modifier = metrics.get(
            "loss_modifier",
            1.0
        )

        estimated_loss = (
            current_loss *
            loss_ratio *
            loss_modifier *
            criticality_multiplier
        )

        estimated_loss = round(
            estimated_loss,
            2
        )

        estimated_loss = max(
            0.05,
            min(
                estimated_loss,
                current_loss
            )
        )

        # -----------------------------------
        # Strategy modifiers
        # -----------------------------------


        recovery_modifier = metrics.get(
            "recovery_modifier",
            1.0
        )

        spread_modifier = metrics.get(
            "spread_modifier",
            1.0
        )

        estimated_loss = round(
            estimated_loss,
            2
        )

        predicted_spread = max(

            0,

            round(

                predicted_spread *

                spread_modifier

            )

        )
                
        # -----------------------------------
        # Recovery estimation
        # -----------------------------------


        estimated_recovery = (
            historical_recovery *
            spread_ratio *
            recovery_modifier
        )

        estimated_recovery = max(

            5,

            round(

                estimated_recovery,

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

        confidence_result["confidence"] = min(
            95,
            confidence_result["confidence"]

            +

            len(graph["removed_stages"])
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

        success_probability = round(

            historical_success
            +
            len(graph["removed_stages"]) * 3
            -
            predicted_spread * 2
        )

        success_probability = max(
            40,
            min(
                success_probability,
                95
            )
        )

        return {

            # ---------------------------------
            # Candidate Identity
            # ---------------------------------

            "candidate_id":
                candidate["candidate_id"],

            "base_playbook":
                candidate["base_playbook"],

            "playbook":
                playbook,

            "playbook": playbook,

            "playbook_id": playbook["id"],

            "strategy":
                strategy,

            "metrics":
                metrics,

            # ---------------------------------
            # Simulation
            # ---------------------------------

            "success_probability":
                success_probability,

            "ueba_confidence":
                confidence_result["confidence"],

            "dna_similarity":
                success_probability,

            "confidence":
                confidence_result["confidence"],

            "confidence_breakdown":
                confidence_result["breakdown"],

            "estimated_loss":
                estimated_loss,

            "estimated_recovery":
                estimated_recovery,

            "predicted_spread":
                predicted_spread,

            "services_saved":
                services_saved,

            "continuity":

                max(
                    40,
                    100 - predicted_spread * 20
                ),

            "customer_score":

                max(
                    50,
                    100 - predicted_spread * 15
                ),

            "compliance_score":

                max(
                    60,
                    100 - len(graph["removed_stages"]) * 5
                ),

            "reputation_score":

                max(
                    40,
                    100 - estimated_loss * 2
                ),

            "graph":
                graph,

            "topology":
                topology,

            "blocked":
                blocked,

            "reasoning":[

                f"Strategy : {strategy}",

                f"Isolated {len(isolated)} services.",

                f"Protected {len(protected)} services.",

                spread_reason,

                f"Attack graph reduced to {len(graph['remaining_path'])} stages.",

                f"Blocked stages: {', '.join(removed_stage_names) if removed_stage_names else 'None'}",

                f"Estimated financial loss ₹{estimated_loss} Cr.",

                f"Historical success {historical_success}%",

                f"Predicted success {success_probability}%",

                f"Strategy {strategy}",

                f"Graph removed {len(graph['removed_stages'])} stages."

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