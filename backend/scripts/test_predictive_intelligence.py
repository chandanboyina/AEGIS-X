from simulation.enterprise_pipeline import EnterprisePipeline
from agents.oracle.oracle_agent import OracleAgent
from agents.sentinel.sentinel_agent import SentinelAgent
from agents.incident_manager.incident_manager import IncidentManager
import pprint

pipeline = EnterprisePipeline()

oracle = OracleAgent()
sentinel = SentinelAgent()
manager = IncidentManager()

for packet in pipeline.run_live():

    packet = oracle.investigate(packet)

    if packet["oracle"]["category"] == "Normal":
        continue

    packet = sentinel.respond(packet)

    packet = manager.create(packet)

    strategic = packet["incident"]["commander"]["strategic_analysis"]

    print()
    print("=" * 70)
    print("PREDICTIVE INTELLIGENCE")
    print("=" * 70)


    for option in strategic["strategies"]:

        print(f"Playbook : {option['playbook']}")

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

    best = strategic["recommended"]

    print()
    print("=" * 70)
    print("RECOMMENDED PLAYBOOK")
    print("=" * 70)

    print(f"Playbook            : {best['playbook']}")
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
    for point in strategic["timeline"]:

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