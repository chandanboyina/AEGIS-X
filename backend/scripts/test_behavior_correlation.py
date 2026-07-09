from agents.correlation.behavior_correlation import BehaviorCorrelation

events = [

    {

        "timestamp":"2026-07-05T10:00:00",

        "asset":"DC-01",

        "user":"Administrator",

        "category":"Credential Access",

        "mitre":{

            "tactic":"Credential Access"

        }

    },

    {

        "timestamp":"2026-07-05T10:02:00",

        "asset":"DC-01",

        "user":"Administrator",

        "category":"Execution",

        "mitre":{

            "tactic":"Execution"

        }

    },

    {

        "timestamp":"2026-07-05T10:05:00",

        "asset":"DC-01",

        "user":"Administrator",

        "category":"Lateral Movement",

        "mitre":{

            "tactic":"Lateral Movement"

        }

    }

]

engine = BehaviorCorrelation()

campaigns = engine.analyze(events)

print("="*70)
print("BEHAVIOR CORRELATION")
print("="*70)
print()

for campaign in campaigns:

    print("Asset :", campaign["asset"])
    print("Attack :", campaign["attack"])
    print("Confidence :", campaign["confidence"])

    print(
        "Risk :",
        campaign["risk"]["risk"]
    )

    print(
        "Severity :",
        campaign["risk"]["severity"]
    )

    print(
        "Priority :",
        campaign["risk"]["priority"]
    )

    print(
        "Next Stage :",
        campaign["risk"]["next_stage"]
    )
    print("Users :", campaign["users"])

    print()

    print("Reasons")

    for reason in campaign["reasons"]:

        print("-", reason)

    print()

    print("Timeline")

    for event in campaign["timeline"]:

        print("-", event["category"])

    print()