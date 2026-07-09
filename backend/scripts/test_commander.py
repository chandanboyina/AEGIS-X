from simulation.enterprise_pipeline import EnterprisePipeline

from agents.oracle.oracle_agent import OracleAgent

from agents.sentinel.sentinel_agent import SentinelAgent

from agents.incident_manager.incident_manager import IncidentManager


pipeline = EnterprisePipeline()

oracle = OracleAgent()

sentinel = SentinelAgent()

manager = IncidentManager()


print()

print("="*70)

print("COMMANDER AI")

print("="*70)


for packet in pipeline.run_live():

    packet = oracle.investigate(packet)

    if packet["oracle"]["category"] == "Normal":

        continue

    packet = sentinel.respond(packet)

    packet = manager.create(packet)

    commander = packet["incident"]["commander"]

    print()

    print("-"*70)

    print(packet["incident"]["incident_id"])

    print()

    print("Decision")

    print("--------------------------------")

    decision = commander["decision"]

    brain = packet["incident"]["brain"]

    history = brain["history"]

    similar = brain["similar"]

    print()

    print("Enterprise Brain")

    print("--------------------------------")

    print("Previous Incidents :", len(history))

    print()

    print("Similar Incident")

    print("--------------------------------")

    if similar["incident"] is None:

        print("Similar Incident : None")

        print("Similarity       : 0%")

    else:

        previous = similar["incident"]

        analysis = similar["analysis"]

        print(
            f"Incident ID : {previous.get('incident_id','Unknown')}"
        )

        print(
            f"Category    : {previous.get('category','Unknown')}"
        )

        print(
            f"Similarity  : {analysis['similarity']}%"
        )

        print()

        print("Reasoning")

        for reason in analysis.get("reasons", []):

            print(f"✓ {reason}")

    playbook = commander["strategic_analysis"]

    print()
    print("Commander Recommendation")
    print("--------------------------------")

    if playbook:

        candidate = playbook["recommended"]

        print(type(candidate))
        print(candidate)

        print(type(candidate["playbook"]))
        print(candidate["playbook"])

        pb = candidate["playbook"]

        print(f"Playbook  : {candidate['base_playbook']}")
        print(f"Strategy  : {candidate['strategy']}")
        print(f"Name      : {pb['name']}")

        history = playbook.get("history")

        if history:

            print(f"Confidence         : {history['confidence']}%")
            print(f"Success Rate       : {history['success_rate']}%")
            print(f"Average Recovery   : {history['average_recovery']} min")
            print(f"Average Loss       : ₹{history['average_loss']} Cr")

        print()
        print("Playbook Steps")
        print("--------------------------------")

        for step in pb["steps"]:
            print(f"✓ {step}")

    else:

        print("No recommendation available.")
        print()

        print("Playbook Steps")

        for step in pb["steps"]:

            print(f"✓ {step}")
    print()
    


    print(

        decision["predicted_attack"]

    )

    print(

        f"{decision['probability']}%"

    )

    print(
        f"Action        : {decision['recommended_action']}"
    )

    print(
        f"Human Approval: {decision['human_approval']}"
    )

    print()

    print("Decision Reasons")

    print("--------------------------------")

    for reason in decision["reasons"]:

        print(f"✓ {reason}")

    print()

    print("Enterprise Time Machine")

    print("--------------------------------")

    forecast = commander["forecast"]["forecast"]

    tm = forecast["time_machine"]

    print(

        f"Current Stage : "

        f"{tm['current_stage']}"

    )

    print(

        f"Historical Incidents : "

        f"{tm['history']}"

    )

    print(

        f"Similarity : "

        f"{tm['similarity']}%"

    )

    print()

    print("Predicted Attack Timeline")

    print("--------------------------------")

    print()
    print("Predicted Campaign")
    print("--------------------------------")

    for stage in tm["timeline"]:

            print(
                f"{stage['time']}  "
                f"{stage['stage']}"
            )

            print(
                f"   Probability : "
                f"{stage['probability']}%"
            )

            print(
                f"   ETA         : "
                f"{stage['eta_minutes']} min"
            )

            print(
                f"   Historical  : "
                f"{stage['observations']} observations"
            )

            print("   Confidence")

            for key, value in stage["confidence"].items():

                print(
                    f"      {key:18}: {value}"
                )

            print()

            print("   Reasoning")

            for reason in stage["reasoning"]:

                print(f"      ✓ {reason}")

            print()

    print("Confidence")

    print("--------------------------------")

    print(

        f"{forecast['confidence']}%"

    )

    enterprise = forecast["enterprise_risk"]

    print()

    print("Enterprise Risk")

    print("--------------------------------")

    print(

        f"Overall Risk : "

        f"{enterprise['enterprise_score']}/100"

    )

    print()

    print("Risk Breakdown")

    print("--------------------------------")

    for key, value in enterprise["breakdown"].items():

        print(f"{key:18}: {value}")

    print()

    print("Confidence Breakdown")

    print("--------------------------------")

    for key, value in forecast[
        "confidence_breakdown"
    ].items():

        print(f"{key:15} : {value}")




    print()

    impact = forecast["business_impact"]

    print()
    print("Business Impact")
    print("--------------------------------")

    print(f"Business Service : {impact['service']}")
    print(f"Business Unit    : {impact['business_unit']}")
    print(f"Criticality      : {impact['criticality']}")

    print()

    print(f"Affected Servers : {impact['affected_servers']}")
    print(f"Affected Users   : {impact['affected_users']:,}")
    print(f"Enterprise Users : {impact['enterprise_users']:,}")

    print()

    print(f"Cost Per Hour    : {impact['hourly_cost']}")
    print(f"Downtime         : {impact['downtime']}")

    print()


    print("Financial Breakdown")
    print("--------------------------------")

    print(f"Direct Recovery  : {impact['direct_cost']}")
    print(f"Operational Loss : {impact['operational_cost']}")
    print(f"Compliance Cost  : {impact['compliance_cost']}")
    print(f"Reputation Cost  : {impact['reputation_cost']}")

    print()

    print(f"Estimated Loss   : {impact['estimated_loss']}")
    print(f"Impact Level     : {impact['operational_impact']}")

    print()
    print("Business Impact Reasoning")
    print("--------------------------------")

    for line in impact["explanation"]:

        print(f"✓ {line}")


    blast = packet["incident"]["blast_radius"]

    print()
    print("Enterprise Blast Radius")
    print("--------------------------------")
    print(f"Dependency Count : "f"{blast['dependency_count']}")
    print(f"Blast Score      : "f"{blast['blast_radius_score']}/100")

    print()
    print("Potentially Affected Services")
    print("--------------------------------")
    for service in blast["affected_services"]:
        print(f"• {service}")


    print()
    print("=" * 70)
    print("CYBER DIGITAL TWIN")
    print("=" * 70)

    twin = commander["digital_twin"]

    print()

    print("Entry Point")
    print("--------------------------------")
    print(twin["topology"]["entry"])

    print()

    print("Attack Simulation")
    print("--------------------------------")

    path = twin["attack_path"]

    for i, stage in enumerate(path):

        if i == 0:
            print(stage)
        else:
            print("↓")
            print(stage)

    print()

    print()

    print("Attack Spread")
    print("--------------------------------")

    for service in twin["spread"]:

        print(
            f"{service['service']:<30}"
            f"{service['status']}"
        )

    print()
    print("Attack Path")
    print("--------------------------------")

    from pprint import pprint
    for i, node in enumerate(path):

        if i:

            print("        │")
            print("        ▼")

        print(f"   {node}")

    print()
    print("Containment Simulation")
    print("--------------------------------")
    for service in twin["containment"]:

        status = "Isolated" if service["isolated"] else "Not Isolated"

        print(
            f"{service['service']:<30}"
            f"{status}"
        )

    print()

    print("Recovery Simulation")
    print("--------------------------------")

    recovery = twin["recovery"]

    print()
    print("Recovery Timeline")
    print("--------------------------------")

    print(
        f"Estimated Recovery Time : "
        f"{recovery['estimated_recovery']}"
    )

    print(
        f"Services Restored       : "
        f"{recovery['services_restored']}"
    )

    print()
    print("=" * 70)
    print("DIGITAL TWIN SUMMARY")
    print("=" * 70)

    print(
        f"Entry Point         : "
        f"{twin['topology']['entry']}"
    )

    print(
        f"Predicted Spread    : "
        f"{len(twin['spread'])} services"
    )

    print(
        f"Containment Success : "
        f"{twin['recovery']['services_restored']}"
    )

    print(
        f"Recovery ETA        : "
        f"{twin['recovery']['estimated_recovery']}"
    )    
