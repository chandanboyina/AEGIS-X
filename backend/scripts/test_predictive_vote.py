from simulation.enterprise_pipeline import EnterprisePipeline
from agents.oracle.oracle_agent import OracleAgent
from agents.sentinel.sentinel_agent import SentinelAgent
from agents.incident_manager.incident_manager import IncidentManager

from agents.predictive.predictive_vote import PredictiveVote


pipeline = EnterprisePipeline()

oracle = OracleAgent()

sentinel = SentinelAgent()

manager = IncidentManager()

vote = PredictiveVote()


for packet in pipeline.run_live():

    packet = oracle.investigate(packet)

    if packet["oracle"]["category"] == "Normal":
        continue

    packet = sentinel.respond(packet)

    packet = manager.create(packet)

    strategic = packet["incident"]["commander"]["strategic_analysis"]

    proposals = vote.evaluate_strategies(

        packet["incident"],

        strategic["strategies"]

    )

    print()

    print("=" * 70)
    print("PREDICTIVE AI")
    print("=" * 70)

    for proposal in proposals:

        print(

            f"{proposal.playbook:<30}"

            f"{proposal.score}"

        )

        print(

            "   Breakdown:",

            proposal.evidence["objective"]["breakdown"]

        )

        print()

    break