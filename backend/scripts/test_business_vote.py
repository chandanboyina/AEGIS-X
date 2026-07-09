from agents.business.business_vote import BusinessVote

vote = BusinessVote()

incident = {

    "category":"Credential Dumping"

}

context = {

    "estimated_loss":3,

    "estimated_recovery":18,

    "services_saved":4,

    "continuity":88

}

proposals = vote.evaluate(

    incident,

    context

)

print()

print("="*70)

print("BUSINESS AI")

print("="*70)

for proposal in proposals:

    print(

        proposal.playbook,

        proposal.score

    )