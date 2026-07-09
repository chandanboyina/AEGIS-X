from agents.soar.orchestrator import SOAROrchestrator

engine = SOAROrchestrator()

playbook = {

    "actions": {

        "isolate":[

            "Firewall"

        ],

        "protect":[

            "Backup Server"

        ],

        "block":[

            "Credential Dumping"

        ]

    }

}

result = engine.execute(
    playbook
)

print()

print("===== WORKFLOW =====")

for step in result["workflow"]:

    print(step)

print()

print("===== RESULTS =====")

for r in result["results"]:

    print(r)