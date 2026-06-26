from agents.observer.observer_agent import ObserverAgent

event = {
    "source": "Firewall",
    "event_type": "Port Scan",
    "severity": "High",
    "description": "Multiple port scan attempts detected.",
    "raw_log": "Port scan from 192.168.1.50"
}

result = ObserverAgent.analyze(event)

print(result)