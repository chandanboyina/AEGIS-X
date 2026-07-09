from agents.correlation.enterprise_intelligence_builder import EnterpriseIntelligenceBuilder

builder = EnterpriseIntelligenceBuilder()

enterprise = builder.build(

    threat={

        "score":80

    },

    behavior={

        "confidence":75

    },

    campaign={

        "risk":{

            "risk":92

        }

    },

    ueba={

        "confidence":83

    },

    cyber_dna={

        "similarity":91

    },

    business={

        "confidence":70

    },

    enterprise={

        "enterprise_score":95

    }

)

print("=" * 60)
print("ENTERPRISE INTELLIGENCE")
print("=" * 60)
print()

print("Overall Risk :", enterprise["overall_risk"])
print("Priority     :", enterprise["priority"])
print("Recommendation :", enterprise["recommended_action"])