from agents.oracle.oracle_reasoner import OracleReasoner
from agents.oracle.oracle_decision import OracleDecision
from agents.oracle.oracle_report import OracleReport
from agents.correlation.enterprise_intelligence_builder import EnterpriseIntelligenceBuilder
from datetime import datetime


class OracleAgent:

    def __init__(self):

        self.reasoner = OracleReasoner()

        self.decision = OracleDecision()

        self.report = OracleReport()

        self.enterprise_builder = EnterpriseIntelligenceBuilder()

    def investigate(self, packet):

        #
        # Initialize enterprise packet fields
        #

        packet.setdefault("audit", [])

        packet.setdefault("notes", [])

        packet.setdefault("warnings", [])

        packet.setdefault("recommendations", [])

        packet.setdefault("metadata", {

            "generated_at": datetime.now().strftime(

                "%Y-%m-%d %H:%M:%S"

            )

        })

        packet.setdefault("telemetry", {})

        packet.setdefault("oracle", {})

        packet.setdefault("incident", {})

        
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

                investigation.get(

                    "threat_level",

                    "Unknown"

                ),

            "priority":

                investigation.get(

                    "priority",

                    "Medium"

                ),

            "timestamp":

                packet["metadata"]["generated_at"]

        })

        return packet
    
    def vote(self, packet):

        oracle = packet.get(

            "oracle",

            {}

        )

        return {

            "agent": "Oracle",

            "recommendation":

                oracle.get(

                    "category",

                    "Unknown"

                ),

            "confidence":

                oracle.get(

                    "investigation_confidence",

                    50

                ),

            "weight": 0.20,

            "reason":

                oracle.get(

                    "reasoning",

                    "No reasoning."

                ),

            "evidence": {

                "mitre":

                    oracle.get(

                        "mitre",

                        []

                    ),

                "severity":

                    oracle.get(

                        "severity",

                        "Medium"

                    ),

            },

            "timestamp": packet["metadata"]["generated_at"]

        }