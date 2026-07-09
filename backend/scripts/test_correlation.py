from agents.correlation.threat_correlation import ThreatCorrelation

engine = ThreatCorrelation()

incident = {

    "category": "Credential Dumping",

    "mitre": {

        "id": "T1003"

    }

}

print(

    engine.analyze(

        incident

    )

)