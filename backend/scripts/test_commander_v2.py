from simulation.enterprise_pipeline import EnterprisePipeline

from agents.oracle.oracle_agent import OracleAgent
from agents.sentinel.sentinel_agent import SentinelAgent
from agents.incident_manager.incident_manager import IncidentManager

pipeline = EnterprisePipeline()

oracle = OracleAgent()

sentinel = SentinelAgent()

manager = IncidentManager()

print()
print("=" * 70)
print("AEGIS-X COMMANDER DEMO")
print("=" * 70)

for packet in pipeline.run_live():

    packet = oracle.investigate(packet)

    if packet["oracle"]["category"] == "Normal":
        continue

    packet = sentinel.respond(packet)

    packet = manager.create(packet)

    incident = packet["incident"]

    commander = incident["commander"]

    brain = incident["brain"]

    twin = commander["digital_twin"]

    oracle_ai = packet["oracle"]

    sentinel_ai = packet["sentinel"]

    forecast_report = commander["forecast"]

    forecast = forecast_report["forecast"]

    risk = forecast["enterprise_risk"]

    business = forecast["business_impact"]
    
    tm = forecast["time_machine"]

    dna = commander["cyber_dna"]

    ueba = commander["ueba"]

    graph = commander["graph_ai"]

    decision = commander["decision"]

    decision["recommended_action"]

    decision["probability"]

    decision["predicted_attack"]

    print()
    print("-" * 70)

    print("Incident ID :", incident["incident_id"])

    print("Asset       :", incident["asset"]["hostname"])

    print("User        :", incident["event"].get("username"))

    print("Source IP   :", incident["event"].get("source_ip"))

    print("Event       :", incident["event"]["event_type"])

    print("Category    :", oracle_ai["category"])

    print()

    print("ORACLE AI")

    print("-" * 40)

    print("Threat Level :", oracle_ai["threat_level"])

    print("Priority     :", oracle_ai["priority"])

    print("Risk Score   :", oracle_ai["overall_risk"])

    print("MITRE        :", oracle_ai["mitre"]["id"])

    print("Technique    :", oracle_ai["mitre"]["technique"])

    response = incident["response"]

    print()

    print("SENTINEL")

    print("-" * 40)

    print(response.keys())

    print("Playbook :", response["playbook"])

    print("Action   :", response["action"])

    print("Priority :", response["priority"])

    print()

    print("ENTERPRISE BRAIN")

    print("-" * 40)

    similar = brain["similar"]

    if similar["incident"] is None:

        print("Similar Incident : None")

    else:

        print(

            "Incident :",

            similar["incident"]["incident_id"]

        )

        print(

            "Similarity :",

            similar["analysis"]["similarity"],

            "%"

        )

    print()

    print(

        "Historical Records :",

        len(brain["history"])

    )

    print()
    print("=" * 50)
    print("COMMANDER KEYS")
    print("=" * 50)
    print(commander.keys())
    print()

    strategic = commander["strategic_analysis"]

    recommended = strategic["recommended"]

    print()
    print("=" * 60)
    print(type(recommended["playbook"]))
    print(recommended["playbook"])
    print("=" * 60)

    playbook = recommended["playbook"]

    print()
    print("COMMANDER AI")
    print("-" * 40)

    print("Playbook :", recommended["base_playbook"])

    print("Strategy :", recommended["strategy"])

    print("Candidate:", recommended["candidate_id"])

    print("Name     :", playbook["name"])

    print()

    print("Steps")

    for step in playbook["steps"]:

        print(" ✓", step)

    council = commander["ai_council"]

    print()

    print("AI COUNCIL")

    print("-" * 40)

    print(

        "Winner :",

        council["winner"]

    )

    print(

        "Confidence :",

        council["confidence"]

    )

    print(

        "Agreement :",

        council["agreement"]

    )

    print()

    print("DIGITAL TWIN")

    print("-" * 40)

    print(

        "Entry Point :",

        twin["topology"]["entry"]

    )

    print()

    print("Attack Path")

    for node in twin["attack_path"]:

        print(" ->", node)

    print()

    print(

        "Recovery ETA :",

        twin["recovery"]["estimated_recovery"]

    )

    xai = commander["xai"]

    print()

    print("EXPLAINABLE AI")

    print("-" * 40)

    for line in xai["business"]["reasoning"]:

        print("✓", line)

    print()

    for line in xai["graph"]["reasoning"]:

        print("✓", line)

    print()

    for line in xai["council"]["reasoning"]:

        print("✓", line)

    print()

    print("=" * 70)

    #DEBUG

    forecast = commander["forecast"]

    

    