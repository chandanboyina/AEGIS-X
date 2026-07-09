from agents.business.business_vote import BusinessVote

vote = BusinessVote()

incident = {

    "category": "Credential Dumping"

}

proposals = vote.evaluate(
    incident
)

print()

print("=" * 70)
print("BUSINESS AI")
print("=" * 70)

for proposal in proposals:

    print(

        proposal.playbook,

        proposal.score,

        proposal.objective

    )