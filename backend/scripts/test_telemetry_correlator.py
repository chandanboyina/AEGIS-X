from collectors.telemetry.enterprise_telemetry import EnterpriseTelemetry
from agents.correlation.telemetry_correlator import TelemetryCorrelator

telemetry = EnterpriseTelemetry().collect()

correlator = TelemetryCorrelator()

incidents = correlator.correlate(telemetry)

print("="*60)
print("ENTERPRISE CORRELATION")
print("="*60)
print()

print("Correlated Events :", len(incidents))
print()

for incident in incidents[:10]:

    print(

        incident["source"],

        incident["category"],

        incident["severity"],

        incident["risk"]

    )