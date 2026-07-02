from agents.commander.enterprise_time_machine import EnterpriseTimeMachine
from agents.commander.enterprise_risk_engine import EnterpriseRiskEngine

tm = EnterpriseTimeMachine()
risk_engine = EnterpriseRiskEngine()

# Create a minimal incident
incident = {
    "category": "Credential Access",
    "asset": "CBSE-VPN-01",
    "ioc_list": [{}, {}, {}, {}],
    "mitre_confidence": 91,
    "observer_confidence": 84
}

enterprise_risk = {
    "enterprise_score": 78
}

result = tm.predict(
    incident,
    enterprise_risk
)

print(result)