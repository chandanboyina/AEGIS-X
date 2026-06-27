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

# -------------------------------
# NORMAL TRAINING DATA
# -------------------------------

training_events = [

    {
        "source": "Windows",
        "event_type": "Successful Login",
        "severity": "LOW",
        "description": "Employee login",
        "raw_log": "Login successful"
    },

    {
        "source": "Windows",
        "event_type": "Successful Login",
        "severity": "LOW",
        "description": "User login",
        "raw_log": "Authentication success"
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
        "description": "Firewall blocked connection",
        "raw_log": "Blocked TCP packet"
    },

    {
        "source": "Windows",
        "event_type": "Failed Login",
        "severity": "MEDIUM",
        "description": "Two failed login attempts",
        "raw_log": "Event ID 4625"
    }

]

# Train using many normal events
for i in range(20):

    event = training_events[i % len(training_events)]

    packet = EvidenceBuilder.build(event, asset)
    packet = ContextEngine.enrich(packet)
    packet = FeatureEngine.extract(packet)

    model.add_training_sample(packet)

model.train()

# --------------------------------
# TEST EVENT
# --------------------------------

attack = {
    "source": "Firewall",
    "event_type": "Port Scan",
    "severity": "HIGH",
    "description": "Massive external reconnaissance targeting authentication server",
    "raw_log": "Thousands of SYN packets detected"
}

packet = EvidenceBuilder.build(
    attack,
    asset,
)

packet = ContextEngine.enrich(packet)

packet = FeatureEngine.extract(packet)

prediction, score = model.predict(packet)

print("\nPrediction :", model.prediction_label(prediction))
print("Confidence :", round(score, 4))