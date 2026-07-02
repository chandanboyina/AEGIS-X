from agents.commander.attack_graph_simulator import AttackGraphSimulator

graph = AttackGraphSimulator()

attack_path = [
    "Reconnaissance",
    "Credential Access",
    "Privilege Escalation",
    "Lateral Movement",
    "Ransomware"
]

result = graph.simulate(
    attack_path,
    ["Privilege Escalation"],
    {}
)

print("=" * 70)
print("ATTACK GRAPH SIMULATION")
print("=" * 70)

print("\nOriginal Path")
print("-" * 40)
for stage in attack_path:
    print(stage)

print("\nRemaining Path")
print("-" * 40)
for stage in result["remaining_path"]:
    print(stage)

print("\nRemoved Stages")
print("-" * 40)
for stage in result["removed_stages"]:
    print(stage)

print()

print(f"Remaining Probability : {result['remaining_probability']}%")
print(f"Attack Stopped        : {result['stopped']}")