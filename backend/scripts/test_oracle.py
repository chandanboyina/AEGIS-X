from simulation.enterprise_pipeline import EnterprisePipeline
from agents.oracle.oracle_agent import OracleAgent

pipeline = EnterprisePipeline()

oracle = OracleAgent()

packets = list(
    pipeline.run_live()
)

print("\nORACLE AI\n")
print("=" * 60)

for packet in packets:

    if packet["observer"]["decision"] == "ALLOW":
        continue

    packet = oracle.investigate(packet)

    result = packet["oracle"]

    print("=" * 70)

    print("Incident ID :", result["incident_id"])

    print("Asset       :", packet["asset"]["hostname"])

    print("Event       :", packet["event"]["event_type"])

    print("Category    :", result["category"])

    print("Threat      :", result["threat_level"])

    print("Priority    :", result["priority"])

    print("Confidence  :", f"{result['confidence']}%")

    print("Status      :", result["status"])

    print()

    print("MITRE ATT&CK")

    print("------------")

    print(
        "Technique ID :",
        result["mitre"]["id"]
    )

    print(
        "Technique    :",
        result["mitre"]["technique"]
    )

    print(
        "Tactic       :",
        result["mitre"]["tactic"]
    )

    print("\nReasoning")

    for line in result["reasoning"]:
        print(" •", line)

    print("\nRecommendation")

    print(" •", result["recommendation"])

    print()