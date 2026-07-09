from agents.graph_ai.graph_vote import GraphVote

graph = GraphVote()

incident = {

    "category":"Credential Dumping"

}

graph_reasoning = {

    "critical_nodes":[
        1,
        2,
        3
    ],

    "attack_depth":4,

    "density":0.6,

    "components":1

}

proposals = graph.evaluate(

    incident,

    graph_reasoning

)

print()

print("="*70)

print("GRAPH AI")

print("="*70)

for proposal in proposals:

    print(
        f"{proposal.playbook:<30}"
        f"{proposal.score:>3}"
    )

    objective = proposal.evidence["objective"]

    print(
        "   Breakdown:",
        objective["breakdown"]
    )

    print()