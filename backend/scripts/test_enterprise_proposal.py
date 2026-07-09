from agents.knowledge_graph.enterprise_brain import EnterpriseCyberBrain

brain = EnterpriseCyberBrain()

incident = {

    "category": "Credential Dumping",

    "severity": "HIGH"

}

print("=" * 60)
print("PLAYBOOK TEMPLATES")
print("=" * 60)

templates = brain.get_playbook_templates(incident)

for pb in templates:
    print(pb["id"], pb["name"])

print()

print("=" * 60)
print("RECOMMENDATION")
print("=" * 60)

print(brain.recommend_playbook(incident))

print()

print("=" * 60)
print("PROPOSALS")
print("=" * 60)

for proposal in brain.evaluate(incident):

    print(
        proposal.playbook,
        proposal.score,
        proposal.objective
    )