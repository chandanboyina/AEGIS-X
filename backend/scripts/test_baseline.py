from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine
from ai.behavior.baseline import BehaviorBaseline

baseline = BehaviorBaseline()

asset = {
    "hostname": "CBSE-APP-01",
    "criticality": "Critical",
    "department": "Education"
}

events = [

    {
        "source": "Windows",
        "event_type": "Successful Login",
        "severity": "LOW",
        "description": "Normal employee login",
        "raw_log": "Login successful"
    },

    {
        "source": "Windows",
        "event_type": "Successful Login",
        "severity": "LOW",
        "description": "Employee login",
        "raw_log": "Login successful"
    },

    {
        "source": "Firewall",
        "event_type": "Port Scan",
        "severity": "HIGH",
        "description": "External port scan detected",
        "raw_log": "Port scan from 192.168.1.50"
    }

]

for event in events:

    packet = EvidenceBuilder.build(
        event,
        asset,
    )

    packet = ContextEngine.enrich(packet)

    packet = FeatureEngine.extract(packet)

    profile = baseline.update(packet)

print(profile)