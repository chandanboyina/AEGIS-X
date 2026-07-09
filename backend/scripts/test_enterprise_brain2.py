from core.brain_service import brain

incident = {

    "category": "Credential Dumping",

    "mitre": {
        "id": "T1003"
    },

    "asset": "Database",

    "severity": "High"
}

result = brain.get_playbook(incident)

print("\n===== PLAYBOOK =====")
print(result["recommended"]["id"])

print("\n===== RAG SUMMARY =====")
print(result["intelligence"]["summary"])

print("\n===== KNOWLEDGE GRAPH =====")
print(result["intelligence"]["knowledge_graph"])

print()
print("===== INTELLIGENCE SCORE =====")
print(
    result["intelligence_score"]
)

print()
print("===== THREAT CORRELATION =====")
print(
    result["correlation"]["score"]
)