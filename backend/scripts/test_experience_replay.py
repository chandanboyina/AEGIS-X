from core.brain_service import brain

# -------------------------
# Teach the brain
# -------------------------

brain.learn_outcome(

    incident={

        "incident_id": "IM-1001",

        "category": "Credential Access",

        "asset": "CBSE-VPN-01",

        "severity": "HIGH",

        "mitre": {

            "id": "T1110"

        }

    },

    playbook="PB-014",

    recovery_minutes=18,

    business_loss=2.4,

    success=True,

    services_saved=5,

    services_lost=1,

    blast_before=6,

    blast_after=1,

    analyst_rating=5

)

# -------------------------
# Incident to replay
# -------------------------

incident = {

    "category": "Credential Access",

    "asset": "CBSE-VPN-01",

    "severity": "HIGH",

    "mitre": {

        "id": "T1110"

    }

}

print()

print("=" * 70)

print("EXPERIENCE REPLAY")

print("=" * 70)

result = brain.replay_incident(
    incident
)

print(result)