from agents.digital_twin.topology_builder import TopologyBuilder
from agents.digital_twin.attack_simulator import AttackSimulator
from agents.digital_twin.spread_engine import SpreadEngine
from agents.digital_twin.containment_simulator import ContainmentSimulator
from agents.digital_twin.recovery_simulator import RecoverySimulator
from agents.digital_twin.twin_report import TwinReport
from core.brain_service import brain
from agents.commander.playbook_simulator import PlaybookSimulator
#from agents.forecasting.business.business_impact import BusinessImpact


class CyberDigitalTwin:

    def __init__(self):

        self.topology = TopologyBuilder()

        self.attack = AttackSimulator()

        self.spread = SpreadEngine()

        self.containment = ContainmentSimulator()

        self.recovery = RecoverySimulator()

        self.report = TwinReport()

        self.simulator = PlaybookSimulator()

        #self.business = BusinessImpact()

    def simulate(self, incident):

        topology = self.topology.build(incident)

        attack = self.attack.simulate(topology)

        spread = self.spread.predict(attack)

        containment = self.containment.simulate(spread)

        recovery = self.recovery.simulate(spread)

        return self.report.build(

            topology,

            attack,

            spread,

            containment,

            recovery

        )
    

    def vote(
        self,
        incident,
        twin
    ):
        """
        Digital Twin AI

        Evaluates every available playbook and
        selects the one predicted to produce the
        smallest blast radius.
        """

        playbooks = brain.get_playbook_templates(
            incident
        )

        if not playbooks:

            return {

                "agent": "Digital Twin",

                "recommendation": "None",

                "confidence": 0,

                "weight": 0.15,

                "reason": [

                    "No playbooks available."

                ],

                "evidence": {},

                "timestamp": incident.get(
                    "timestamp"
                )

            }

        current_spread = len(
            twin["spread"]
        )

        best_playbook = None

        best_radius = float("inf")

        for playbook in playbooks:

            actions = playbook.get(
                "actions",
                {}
            )

            isolated = len(
                actions.get(
                    "isolate",
                    []
                )
            )

            protected = len(
                actions.get(
                    "protect",
                    []
                )
            )

            blocked = len(
                actions.get(
                    "block",
                    []
                )
            )

            predicted_radius = max(

                0,

                current_spread

                - isolated

                - blocked

                - int(protected * 0.5)

            )

            if predicted_radius < best_radius:

                best_radius = predicted_radius

                best_playbook = playbook

        confidence = round(

            100

            -

            best_radius * 10

        )

        confidence = max(

            20,

            min(

                confidence,

                95

            )

        )

        return {

            "agent": "Digital Twin",

            "recommendation": best_playbook["id"],

            "confidence": confidence,

            "weight": 0.15,

            "reason": [

                f"Predicted blast radius {best_radius} services.",

                "Selected playbook minimizes enterprise spread."

            ],

            "evidence": {

                "blast_radius": best_radius,

                "current_spread": current_spread

            },

            "timestamp": incident.get(
                "timestamp"
            )

        }
    
    def evaluate_playbook(
        self,
        incident,
        playbook,
        twin
    ):

        pass