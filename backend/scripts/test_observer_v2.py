from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine
from agents.observer.observer_agent import ObserverAgent

observer = ObserverAgent()

asset = {
    "hostname": "CBSE-APP-01",
    "criticality": "Critical",
    "department": "Education"
}

training_events = [

    {
        "source": "Windows",
        "event_type": "Successful Login",
        "severity": "LOW",
        "description": "Employee login",
        "raw_log": "Login successful"
    },

    {
        "source": "Linux SSH",
        "event_type": "SSH Login",
        "severity": "LOW",
        "description": "SSH session established",
        "raw_log": "Accepted public key"
    },

    {
        "source": "Firewall",
        "event_type": "Blocked Connection",
        "severity": "MEDIUM",
        "description": "Firewall blocked traffic",
        "raw_log": "Blocked TCP packet"
    }

]

print("\n===== LEARNING =====\n")

for i in range(20):

    event = training_events[i % len(training_events)]

    packet = EvidenceBuilder.build(event, asset)

    packet = ContextEngine.enrich(packet)

    packet = FeatureEngine.extract(packet)

    observer.learn(packet)

observer.train()

print("Observer AI trained.\n")

attack = {

    "source": "Firewall",

    "event_type": "Port Scan",

    "severity": "HIGH",

    "description": "Massive reconnaissance attack",

    "raw_log": "Thousands of SYN packets detected"

}

packet = EvidenceBuilder.build(
    attack,
    asset,
)

packet = ContextEngine.enrich(packet)

packet = FeatureEngine.extract(packet)

result = observer.observe(packet)

print()

print("========== CYBER EVIDENCE PACKET ==========\n")

from pprint import pprint

pprint(result, sort_dicts=False)