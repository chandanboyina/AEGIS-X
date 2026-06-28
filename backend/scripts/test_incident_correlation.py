from simulation.enterprise_pipeline import EnterprisePipeline
from agents.oracle.incident_correlation import IncidentCorrelation


pipeline = EnterprisePipeline()

packets = list(
    pipeline.run_live()
)

correlator = IncidentCorrelation()

campaigns = correlator.correlate(
    packets
)

print()
print("=" * 70)
print("INCIDENT CORRELATION")
print("=" * 70)

for campaign in campaigns:

    print()

    print(campaign["campaign_id"])

    print(
        f"Asset       : {campaign['asset']}"
    )

    print(
        f"Category    : {campaign['category']}"
    )

    print(
        f"Events       : {campaign['event_count']}"
    )

    print("-" * 40)

    print("-" * 40)

    print("Attack Chain")

    for stage in campaign["attack_chain"]:

        print(
            f"[Stage {stage['stage']}] "
            f"{stage['tactic']} -> "
            f"{stage['event']}"
        )

    print()

    print("Timeline")
    print("-" * 40)

    for event in campaign["timeline"]:

        print(
            f"{event['timestamp']} | "
            f"{event['event']} | "
            f"{event['category']}"
        )

    print()

    print("Executive Summary")
    print("-" * 40)

    print(
        campaign["report"]["executive_summary"]
    )

    print()

    print("Risk Score")

    print(
        campaign["report"]["risk_score"]
    )

    print()

    print()
    print("MITRE Techniques")
    print("-" * 40)

    for mitre in campaign["report"]["mitre_summary"]:
        print(
            f"{mitre['id']:<10} {mitre['technique']}"
        )

    print("Recommendations")

    for action in campaign["report"]["recommendations"]:

        print(f"• {action}")