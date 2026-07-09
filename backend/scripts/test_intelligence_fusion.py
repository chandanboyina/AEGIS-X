from agents.correlation.enterprise_intelligence_fusion import IntelligenceFusion

fusion = IntelligenceFusion()

campaign = {

    "risk":{

        "risk":95

    }

}

enterprise = {

    "enterprise_score":90

}

business = {

    "confidence":80

}

ueba = {

    "confidence":85

}

cyber_dna = {

    "similarity":92

}

result = fusion.fuse(

    campaign=campaign,

    enterprise=enterprise,

    business=business,

    ueba=ueba,

    cyber_dna=cyber_dna

)

print("="*70)

print("ENTERPRISE INTELLIGENCE")

print("="*70)

print()

print(

    "Overall Risk :",

    result["overall_risk"]

)

print(

    "Priority :",

    result["priority"]

)

print(

    "Recommendation :",

    result["recommended_action"]

)