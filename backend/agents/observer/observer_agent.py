from ai.behavior.behavior_engine import BehaviorEngine
from ai.threats.risk_engine import RiskEngine

class ObserverAgent:
    """
    First AI agent of AEGIS-X.

    Responsible for behavioural analysis
    and first-stage decision making.
    """

    def __init__(self):

        self.behavior_engine = BehaviorEngine()

    def learn(self, packet):
        """
        Learn from normal behaviour.
        """
        self.behavior_engine.learn(packet)

    def train(self):
        """
        Train AI model.
        """
        return self.behavior_engine.train()
    
    def generate_reasoning(
        self,
        packet,
        analysis,
        risk,
    ):
        """
        Generate explainable reasoning.
        """

        baseline = analysis["baseline"]

        prediction = analysis["prediction"]

        confidence = abs(
            analysis["confidence"]
        )

        asset = packet["asset"]

        context = packet["context"]

        features = packet["behavior"]["features"]

        reasoning = []

        reasoning.append(
            f"Asset '{asset['hostname']}' is classified as {asset['criticality']}."
        )

        if context["business_hours"]:
            reasoning.append(
                "The event occurred during business hours."
            )
        else:
            reasoning.append(
                "The event occurred outside business hours."
            )

        reasoning.append(
            f"Observed severity score: {features['severity_score']}."
        )

        reasoning.append(
            f"Average learned severity: {round(baseline['avg_severity'],2)}."
        )

        if prediction == "ANOMALY":

            reasoning.append(
                "Behavior significantly deviates from the learned baseline."
            )

        else:

            reasoning.append(
                "Behavior is consistent with the learned baseline."
            )

        # -----------------------------------------
        # Threat Intelligence
        # -----------------------------------------

        if risk["known_attack"]:

            reasoning.append(
                f"Known attack category detected: {risk['category']}."
            )

            reasoning.append(
                f"Threat intelligence risk score: {risk['risk_score']}."
            )

            reasoning.append(
                "Threat rules elevated the decision to ALERT."
            )

        reasoning.append(
            f"Model confidence: {round(confidence,4)}."
        )

        return reasoning

    def calculate_confidence(self,packet,analysis,risk,):
        """
        Calculate Observer confidence (0-100)
        using multiple contextual factors.
        """

        score = 0

        # -----------------------------------
        # ML Confidence (0-50)
        # -----------------------------------

        ml_confidence = abs(analysis["confidence"])

        score += min(int(ml_confidence * 100), 50)

        # -----------------------------------
        # Asset Criticality (0-20)
        # -----------------------------------

        criticality = packet["asset"]["criticality"]

        if criticality == "Critical":
            score += 20

        elif criticality == "High":
            score += 15

        elif criticality == "Medium":
            score += 10

        else:
            score += 5

        # -----------------------------------
        # Business Hours (0-10)
        # -----------------------------------

        if not packet["context"]["business_hours"]:
            score += 10

        # -----------------------------------
        # AI Prediction (0-20)
        # -----------------------------------

        if analysis["prediction"] == "ANOMALY":
            score += 20

        score += int(
            risk["risk_score"] * 0.5
        )
        return min(score, 100)
    
    def generate_report(self, packet):
        """
        Generate a human-readable Observer AI report.
        """

        observer = packet["observer"]

        asset = packet["asset"]

        report = {

            "title": "Observer AI Report",

            "summary": {

                "asset": asset["hostname"],

                "criticality": asset["criticality"],

                "decision": observer["decision"],

                "priority": observer["priority"],

                "confidence": observer["confidence"],

                "confidence_level": observer["confidence_level"],

                "recommended_action":
                    observer["recommended_action"],
                
                "threat_category": observer["threat_category"],

            },

            "reasoning":
                observer["reasoning"]

        }

        return report

    def observe(self, packet):
        """
        Observe one Cyber Evidence Packet
        and produce an explainable decision.
        """

        analysis = self.behavior_engine.analyze(packet)

        # ---------------------------------
        # Threat Risk Evaluation
        # ---------------------------------

        risk = RiskEngine.evaluate(packet)

        prediction = analysis["prediction"]

        observer_confidence = self.calculate_confidence(
            packet,
            analysis,
            risk,
        )

        # Confidence Level

        if observer_confidence >= 90:
            confidence_level = "Very High"

        elif observer_confidence >= 70:
            confidence_level = "High"

        elif observer_confidence >= 40:
            confidence_level = "Medium"

        else:
            confidence_level = "Low"

        reasoning = self.generate_reasoning(
            packet,
            analysis,
            risk,
        )

        # ---------------------------------
        # Final Observer Decision
        # ---------------------------------

        if risk["known_attack"]:

            decision = "ALERT"

            priority = risk["priority"]

            action = risk["recommended_action"]

        elif prediction == "ANOMALY":

            decision = "ALERT"

            priority = "HIGH"

            action = (
                "Escalate to Oracle AI for threat attribution."
            )

        else:

            decision = "ALLOW"

            priority = "LOW"

            action = (
                "Continue monitoring."
            )

            # ---------------------------------
        # Write Observer findings
        # ---------------------------------

        packet["observer"] = {

            "agent": "Observer AI",

            "version": "1.0",

            "decision": decision,

            "priority": priority,

            "threat_category": risk["category"],

            "confidence": observer_confidence,

            "confidence_level": confidence_level,

            "reasoning": reasoning,

            "recommended_action": action,

            # XAI

            "reasoning":reasoning,

            "analysis":analysis,

            "risk":risk,

            "features":packet["behavior"]["features"]

            

        }

        packet["predictions"]["risk"] = risk

        # Store AI behavior analysis
        packet["predictions"]["behavior"] = analysis

        # Store Observer recommendation
        packet["recommendations"]["observer"] = action

        # Store audit record
        packet["audit"].append({

            "agent": "Observer AI",

            "decision": decision,

            "priority": priority,

            "timestamp": packet["metadata"]["generated_at"]

        })

        # ---------------------------------
        # Generate Observer Report
        # ---------------------------------

        packet["observer_report"] = self.generate_report(
            packet
        )

        return packet
    
    def vote(self, packet):
        """
        Observer AI vote.
        """

        observer = packet["observer"]

        return {

            "agent": "Observer",

            "recommendation": observer["decision"],

            "confidence": observer["confidence"],

            "weight": 0.10,

            "reason": observer["reasoning"],

            "evidence": {

                "priority": observer["priority"],

                "threat_category": observer["threat_category"],

                "confidence_level": observer["confidence_level"]

            },

            "timestamp": packet["metadata"]["generated_at"]

        }