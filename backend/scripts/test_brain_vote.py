from agents.brain.brain_vote import BrainVote

vote = BrainVote()

incident = {
    "category": "Credential Dumping"
}

context = {

    "history": {

        "success_rate": 91,

        "playbook_success": 88

    },

    "similarity": {

        "score": 83

    },

    "intelligence_score": 76

}

proposals = vote.evaluate(
    incident,
    context
)

print("\n===== BRAIN AI =====\n")

for proposal in proposals:

    print(

        proposal.playbook,

        proposal.score

    )