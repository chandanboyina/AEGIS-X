from simulation.enterprise_pipeline import EnterprisePipeline
from agents.oracle.oracle_agent import OracleAgent
from agents.sentinel.sentinel_agent import SentinelAgent
from agents.incident_manager.incident_manager import IncidentManager
from pprint import pprint
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

    print("="*80)
    print("COMMANDER OBJECT")
    print("="*80)

    pprint(packet["incident"]["commander"])

    exit()

    commander = packet["incident"]["commander"]

    prediction = commander["prediction"]

    strategies = prediction["strategies"]

    best = prediction["recommended"]

    timeline = prediction["timeline"]

    commander = packet["incident"]["commander"]

    prediction = commander["prediction"]

    

    proposals = vote.evaluate_strategies(

        packet["incident"],

        prediction["strategies"]

    )

    print()
    print("=" * 70)
    print("PREDICTIVE INTELLIGENCE")
    print("=" * 70)


    for option in prediction["strategies"]:

        pb = option["playbook"]

        print(f"Playbook : {pb['id']}")
        print(f"Name     : {pb['name']}")
        print(f"Strategy : {option['strategy']}")

        print("----------------------------------------")

        print(
            f"Historical Success : "
            f"{option['success_probability']}%"
        )

        print(
            f"Confidence         : "
            f"{option['confidence']}%"
        )

        print(
            f"Estimated Loss     : "
            f"₹{option['estimated_loss']} Cr"
        )

        print(
            f"Recovery Time      : "
            f"{option['estimated_recovery']} minutes"
        )

        print(
            f"Predicted Spread   : "
            f"{option['predicted_spread']} services"
        )

        print(
            f"Services Saved     : "
            f"{option['services_saved']}"
        )

        print()

        print("Reasoning")

        for line in option["reasoning"]:

            print(f"✓ {line}")

        print()

    best = prediction["recommended"]

    print()
    print("=" * 70)
    print("PREDICTIVE AI VOTE")
    print("=" * 70)

    for proposal in proposals:

        print(
            f"{proposal.playbook:<25} "
            f"{proposal.score}"
        )



    pb = best["playbook"]

    print()
    print("=" * 70)
    print("RECOMMENDED PLAYBOOK")
    print("=" * 70)

    print(f"Playbook            : {pb['id']}")
    print(f"Name                : {pb['name']}")
    print(f"Strategy            : {best['strategy']}")

    print(f"Historical Success  : {best['success_probability']}%")
    print(f"Confidence          : {best['confidence']}%")
    print(f"Estimated Loss      : ₹{best['estimated_loss']} Cr")
    print(f"Recovery Time       : {best['estimated_recovery']} Minutes")
    print(f"Predicted Spread    : {best['predicted_spread']} Services")
    print(f"Services Saved      : {best['services_saved']}")

    print()
    print("Reasoning")
    print("----------------------------------------")

    for line in best["reasoning"]:
        print(f"✓ {line}")


    print()

    print("=" * 70)
    print("NEXT HOURS PREDICTION")
    print("=" * 70)
    timeline = prediction["timeline"]

    for point in timeline:

        print()
        print(f"+{point['eta']} Minutes")
        print("-" * 30)
        print(f"Stage              : {point['stage']}")

        if "severity" in point:
            print(f"Severity           : {point['severity']}")

        print(f"Reason             : {point['reason']}")
        print(f"Affected Services  : {point['affected_services']}")

        if "newly_affected" in point:
            print(f"New Services       : "f"{point['newly_affected']}")

        print(f"Business Loss      : "f"₹{point['estimated_loss']} Cr")

        if "loss_growth" in point:
            print(f"Loss Increase      : "f"₹{point['loss_growth']} Cr")

        print(f"Time               : {point['time']}")