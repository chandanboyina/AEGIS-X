from agents.oracle.oracle_reasoner import OracleReasoner
from agents.oracle.oracle_decision import OracleDecision
from agents.oracle.oracle_report import OracleReport


class OracleAgent:

    def __init__(self):

        self.reasoner = OracleReasoner()

        self.decision = OracleDecision()

        self.report = OracleReport()

    def investigate(self, packet):

        investigation = self.reasoner.reason(
            packet
        )

        decision = self.decision.decide(
            investigation
        )

        investigation.update(decision)

        packet["oracle"] = investigation

        packet["oracle_report"] = self.report.generate(
            packet
        )

        packet["audit"].append({

            "agent": "Oracle AI",

            "decision":
                investigation["threat_level"],

            "priority":
                investigation["priority"],

            "timestamp":
                packet["metadata"]["generated_at"]

        })

        return packet
    
    def vote(self, packet):

        oracle = packet["oracle"]

        return {

            "agent": "Oracle",

            "recommendation": oracle["category"],

            "confidence": oracle["investigation_confidence"],

            "weight": 0.20,

            "reason": oracle["reasoning"],

            "evidence": {

                "mitre": oracle["mitre"],

                "severity": oracle["severity"]

            },

            "timestamp": packet["metadata"]["generated_at"]

        }