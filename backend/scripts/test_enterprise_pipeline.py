from pprint import pprint

from simulation.enterprise_pipeline import EnterprisePipeline

pipeline = EnterprisePipeline()

print("\n" + "=" * 80)
print("AEGIS-X ENTERPRISE PIPELINE")
print("=" * 80)

for i, packet in enumerate(pipeline.run_live(), start=1):

    print(f"\nEVENT {i}")
    print("-" * 80)

    print(
        f"Asset      : {packet['asset']['hostname']}"
    )

    print(
        f"Type       : {packet['event']['event_type']}"
    )

    print(
        f"Severity   : {packet['event']['severity']}"
    )

    observer = packet["observer"]

    print(
        f"Decision   : {observer['decision']}"
    )

    print(
        f"Priority   : {observer['priority']}"
    )

    print(
        f"Confidence : {observer['confidence']}%"
    )

    print("\nReasoning")

    for reason in observer["reasoning"]:

        print(f"  • {reason}")

    print("\nAction")

    print(
        f"  {observer['recommended_action']}"
    )