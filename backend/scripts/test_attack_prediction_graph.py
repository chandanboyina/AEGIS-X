from agents.commander.attack_prediction_graph import AttackPredictionGraph

graph = AttackPredictionGraph()

print()

print("=" * 65)

print("ATTACK PREDICTION GRAPH")

print("=" * 65)

print()

future = graph.predict("Credential Access")

for node in future:
    print(node)

print()

print("Learning...")

graph.learn(
    "Credential Access",
    "Privilege Escalation",
    14
)

graph.learn(
    "Credential Access",
    "Privilege Escalation",
    11
)

graph.learn(
    "Credential Access",
    "Privilege Escalation",
    17
)

print()

future = graph.predict("Credential Access")

for node in future:
    print(node)