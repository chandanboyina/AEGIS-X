from agents.intelligence.intelligence_pipeline import IntelligencePipeline

pipeline = IntelligencePipeline()

incident = {

    "category":"Credential Dumping",

    "mitre":{

        "id":"T1003"

    }

}

incident = pipeline.build(
    incident
)

print()

print("===== INTELLIGENCE CACHE =====")

print()

print(

    incident["threat_intelligence"]["score"]

)