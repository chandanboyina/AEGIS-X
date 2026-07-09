from agents.knowledge_graph.playbook_repository import PlaybookRepository

repo = PlaybookRepository()

candidates = repo.candidates(

    "Credential Dumping"

)

print()

print("=" * 70)

print("PLAYBOOK STRATEGIES")

print("=" * 70)

for candidate in candidates:

    print(

        candidate["candidate_id"],

        candidate["metrics"]["historical_success"]

    )