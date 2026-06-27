from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine
from ai.behavior.behavior_engine import BehaviorEngine

engine = BehaviorEngine()

asset = {
    "hostname": "CBSE-APP-01",
    "criticality": "Critical",
    "department": "Education"
}

# -----------------------------
# Training Events
# -----------------------------
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
        "description": "Firewall blocked suspicious connection",
        "raw_log": "Blocked TCP packet"
    }

]

print("\n========== LEARNING ==========\n")

for i in range(20):

    event = training_events[i % len(training_events)]

    packet = EvidenceBuilder.build(event, asset)
    packet = ContextEngine.enrich(packet)
    packet = FeatureEngine.extract(packet)

    engine.learn(packet)

print("Learning completed.")

print("\n========== TRAINING ==========\n")

engine.train()

print("Behavior AI trained successfully.")

print("\n========== ANALYSIS ==========\n")

attack = {

    "source": "Firewall",

    "event_type": "Port Scan",

    "severity": "HIGH",

    "description": "Massive reconnaissance against authentication server",

    "raw_log": "Thousands of SYN packets detected"

}

packet = EvidenceBuilder.build(
    attack,
    asset,
)

packet = ContextEngine.enrich(packet)

packet = FeatureEngine.extract(packet)

result = engine.analyze(packet)

print(result)