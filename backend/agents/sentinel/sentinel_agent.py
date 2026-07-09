from agents.sentinel.sentinel_decision import SentinelDecision
from agents.sentinel.sentinel_report import SentinelReport
from agents.sentinel.rollback_engine import RollbackEngine
from agents.sentinel.rollback_executor import RollbackExecutor


class SentinelAgent:
    """
    Sentinel AI

    Enterprise Response AI.

    Converts Oracle investigations
    into automated response actions.
    """

    def __init__(self):

        self.decision = SentinelDecision()

        self.report = SentinelReport()

        self.rollback_engine = RollbackEngine()

        self.rollback_executor = RollbackExecutor()

    def respond(self, packet):

        # -----------------------------
        # Sentinel Decision
        # -----------------------------
        response = self.decision.decide(
            packet
        )

        packet["sentinel"] = response

        # -----------------------------
        # Rollback (Simulation)
        # -----------------------------
        # Temporary simulation flag.
        # Later replace this with:
        # rollback_required = packet.get("false_positive", False)
        # or another real decision from Oracle AI.
        rollback_required = False

        if rollback_required:

            rollback = self.rollback_engine.build(
                packet
            )

            rollback = self.rollback_executor.execute(
                rollback
            )

        else:

            rollback = []

        packet["sentinel"]["rollback"] = rollback

        # -----------------------------
        # Generate Report
        # -----------------------------
        packet["sentinel_report"] = (
            self.report.generate(packet)
        )

        # -----------------------------
        # Audit Log
        # -----------------------------
        packet["audit"].append({

            "agent": "Sentinel AI",

            "decision":
                response["action"],

            "priority":
                response["priority"],

            "timestamp":
                packet["metadata"]["generated_at"]

        })

        if "incident" in packet:

            packet["incident"]["response"] = response

        return packet
    
    def vote(self, incident):

        response = incident["response"]

        recommendation = response["playbook"]

        commander = incident.get(
            "commander",
            {}
        )

        recommended = commander.get(
            "recommended_playbook"
        )

        if isinstance(recommended, dict):

            recommendation = recommended.get(

                "candidate_id",

                recommendation

            )

        return {

            "agent": "Sentinel",

            "recommendation": recommendation,

            "confidence": response.get(

                "confidence",

                90

            ),

            "weight": 0.15,

            "reason": response.get(

                "reasoning",

                ["No reasoning available."]

            ),

            "evidence": {

                "playbook": response.get(

                    "playbook"

                ),

                "action": response.get(

                    "action"

                )

            },

            "timestamp": incident["created"]

        }