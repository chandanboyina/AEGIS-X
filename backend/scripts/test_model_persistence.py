from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine
from ai.behavior.isolation_model import BehaviorIsolationModel

model = BehaviorIsolationModel()

asset = {
    "hostname": "CBSE-APP-01",
    "criticality": "Critical",
    "department": "Education"
}

training_events = [

    {
        "source":"Windows",
        "event_type":"Successful Login",
        "severity":"LOW",
        "description":"Employee login",
        "raw_log":"Login successful"
    },

    {
        "source":"Linux SSH",
        "event_type":"SSH Login",
        "severity":"LOW",
        "description":"SSH session",
        "raw_log":"Accepted public key"
    },

    {
        "source":"Firewall",
        "event_type":"Blocked Connection",
        "severity":"MEDIUM",
        "description":"Firewall blocked traffic",
        "raw_log":"Blocked packet"
    }

]

for i in range(20):

    event = training_events[i % len(training_events)]

    packet = EvidenceBuilder.build(
        event,
        asset,
    )

    packet = ContextEngine.enrich(packet)

    packet = FeatureEngine.extract(packet)

    model.add_training_sample(packet)

model.train()

model.save(
    "models_ai/behavior_model.pkl"
)

print("Model saved successfully.")

new_model = BehaviorIsolationModel()

new_model.load(
    "models_ai/behavior_model.pkl"
)

print("Model loaded successfully.")