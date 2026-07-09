from agents.digital_twin.topology_builder import TopologyBuilder
from agents.digital_twin.attack_simulator import AttackSimulator
from agents.digital_twin.spread_engine import SpreadEngine
from agents.digital_twin.containment_simulator import ContainmentSimulator
from agents.digital_twin.recovery_simulator import RecoverySimulator
from agents.digital_twin.twin_report import TwinReport
from core.brain_service import brain
from agents.commander.playbook_simulator import PlaybookSimulator
#from agents.forecasting.business.business_impact import BusinessImpact
from agents.digital_twin.digital_twin_vote import DigitalTwinVote


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

        self.vote_engine = DigitalTwinVote()

    def simulate(self, incident):

        topology = self.topology.build(incident)

        attack = self.attack.simulate(topology)

        spread = self.spread.predict(attack)

        containment = self.containment.simulate(spread)

        recovery = self.recovery.simulate(spread)

        report=self.report.build(

            topology,

            attack,

            spread,

            containment,

            recovery

        )

        report["reasoning"]=[

            "Enterprise topology generated.",

            "Attack propagation simulated.",

            "Spread prediction completed.",

            "Containment simulation completed.",

            "Recovery simulation completed."

        ]

        return report
    

    def vote(
        self,
        incident,
        twin,
        strategies
    ):

        if not strategies:

            return {

                "agent":"Digital Twin",

                "recommendation":"None",

                "confidence":0,

                "weight":0.15,

                "reason":[

                    "No simulated strategies."

                ]

            }

        proposals=self.vote_engine.evaluate_strategies(

            incident,

            strategies

        )

        best=proposals[0]

        return {

            "agent":"Digital Twin",

            "recommendation":

                best.playbook,

            "confidence":

                best.confidence,

            "weight":0.15,

            "reason":[

                f"Lowest simulated spread.",

                f"Recovery optimized."

            ],

            "proposal":best,

            "alternatives":proposals[1:4]

        }
    
    def evaluate_playbook(
        self,
        incident,
        playbook,
        twin
    ):

        pass