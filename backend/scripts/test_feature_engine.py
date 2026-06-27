from ai.evidence.evidence_builder import EvidenceBuilder
from ai.behavior.feature_engine import FeatureEngine
from ai.context.context_engine import ContextEngine

event = {
    "source": "Firewall",
    "event_type": "Port Scan",
    "severity": "HIGH",
    "description": "Multiple port scan attempts detected.",
    "raw_log": "Port scan from 192.168.1.50"
}

asset = {
    "hostname": "CBSE-APP-01",
    "criticality": "Critical",
    "department": "Education"
}

packet = EvidenceBuilder.build(
    event,
    asset
)

packet = ContextEngine.enrich(packet)
packet = FeatureEngine.extract(packet)

print(packet)