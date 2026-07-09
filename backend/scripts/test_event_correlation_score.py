from agents.correlation.event_correlation_score import EventCorrelationScore

engine = EventCorrelationScore()

events = [

    {

        "timestamp": "2026-07-05T10:00:00",

        "asset": "DC-01",

        "user": "Administrator",

        "category": "Credential Access",

        "mitre": {

            "tactic": "Credential Access"

        }

    },

    {

        "timestamp": "2026-07-05T10:05:00",

        "asset": "DC-01",

        "user": "Administrator",

        "category": "Credential Access",

        "mitre": {

            "tactic": "Credential Access"

        }

    }

]

result = engine.calculate(events)

print("=" * 60)
print("EVENT CORRELATION")
print("=" * 60)
print()

print("Score :", result["score"])
print()

print("Reasons")

for reason in result["reasons"]:
    print("-", reason)