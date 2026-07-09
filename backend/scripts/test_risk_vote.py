from agents.risk.enterprise_risk_vote import EnterpriseRiskVote

vote = EnterpriseRiskVote()

incident = {

    "category":"Credential Dumping"

}

context = {

    "breakdown":{

        "likelihood":90,

        "impact":82,

        "exposure":76,

        "criticality":95

    }

}

proposals = vote.evaluate(

    incident,

    context

)

print()

print("="*70)

print("ENTERPRISE RISK AI")

print("="*70)

for proposal in proposals:

    print(

        proposal.playbook,

        proposal.score

    )