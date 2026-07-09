from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry
from agents.correlation.telemetry_correlator import TelemetryCorrelator
from agents.correlation.attack_chain_correlator import AttackChainCorrelator

telemetry = EnterpriseTelemetry().collect()

events = TelemetryCorrelator().correlate(

    telemetry

)

chains = AttackChainCorrelator().correlate(

    events

)

print("=" * 70)
print("ATTACK CHAIN CORRELATION")
print("=" * 70)
print()

print("Incidents:", len(chains))
print()

for incident in chains:

    print("Host :", incident["host"])
    print("Events :", incident["events"])
    print("Risk :", incident["risk"])
    print("Confidence :", incident["confidence"])
    print("Attack Chain :")
    print(" -> ".join(incident["attack_chain"]))
    print("MITRE :", incident["mitre"])
    print("-" * 70)