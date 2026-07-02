from core.brain_service import brain

print()
print("=" * 70)
print("ENTERPRISE OUTCOME MEMORY")
print("=" * 70)

# -------------------------------------------------
# Simulate Incident 1
# -------------------------------------------------

incident1 = {

    "incident_id": "IM-1001",

    "category": "Credential Access",

    "asset": "CBSE-VPN-01",

    "severity": "HIGH",

    "mitre": {

        "id": "T1110"

    }

}

brain.learn_outcome(

    incident=incident1,

    playbook="PB-014",

    recovery_minutes=18,

    business_loss=2.4,

    success=True,

    analyst_rating=5,

    notes="Fast containment",

    services_saved=5,

    services_lost=1,

    blast_before=6,

    blast_after=1,

    false_positive=False

)

# -------------------------------------------------
# Simulate Incident 2
# -------------------------------------------------

incident2 = {

    "incident_id": "IM-1002",

    "category": "Credential Access",

    "asset": "CBSE-VPN-02",

    "severity": "HIGH",

    "mitre": {

        "id": "T1110"

    }

}

brain.learn_outcome(

    incident=incident2,

    playbook="PB-014",

    recovery_minutes=21,

    business_loss=2.9,

    success=True,

    analyst_rating=5,

    notes="Successful",

    services_saved=5,

    services_lost=1,

    blast_before=6,

    blast_after=1,

    false_positive=False

)

# -------------------------------------------------
# Simulate Incident 3
# -------------------------------------------------

incident3 = {

    "incident_id": "IM-1003",

    "category": "Credential Access",

    "asset": "CBSE-WEB-01",

    "severity": "HIGH",

    "mitre": {

        "id": "T1110"

    }

}

brain.learn_outcome(

    incident=incident3,

    playbook="PB-001",

    recovery_minutes=42,

    business_loss=6.8,

    success=False,

    analyst_rating=2,

    notes="Containment failed",

    services_saved=5,

    services_lost=1,

    blast_before=6,

    blast_after=1,

    false_positive=False

)

print()

print("Recommendation")
print("-" * 40)

recommendation = brain.recommend_playbook(

    {

        "category": "Credential Access"

    }

)

print(recommendation)

print()

print("Detailed Playbook")
print("-" * 40)

playbook = brain.get_playbook(
    {
        "category": "Credential Access",
        "asset": "CBSE-VPN-01",
        "severity": "HIGH",
        "mitre": {
            "id": "T1110"
        }
    }
)

print(f"Playbook : {playbook['recommended']['id']}")
print(f"Name     : {playbook['recommended']['name']}")

history = playbook["history"]

print(f"Overall Score : {history['overall_score']}")
print(f"Confidence    : {history['confidence']}%")
print(f"Matched Using : {playbook['reason']}")

print(f"Reputation    : {history['reputation']}/100")
print(f"Success Rate  : {history['success_rate']}%")
print(f"Recovery      : {history['average_recovery']} Minutes")
print(f"Business Loss : ₹{history['average_loss']} Cr")

print()

print("Reasoning")

for line in history["reasoning"]:

    print(f"✓ {line}")

print()

print("Ranking")

for i, pb in enumerate(playbook["ranking"], start=1):

    print(
        f"{i}. "
        f"{pb['playbook']}  "
        f"Score:{pb['overall_score']}  "
        f"Confidence:{pb['confidence']}%  "
        f"Reputation:{pb['reputation']}"
    )