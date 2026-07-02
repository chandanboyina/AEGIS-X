from agents.commander.risk_forecast import RiskForecast
from agents.commander.business_forecast import BusinessForecast
from agents.commander.target_predictor import TargetPredictor
from agents.commander.forecast_confidence import ForecastConfidence
from agents.commander.forecast_report import ForecastReport
from agents.commander.enterprise_risk_engine import EnterpriseRiskEngine
from agents.commander.business_impact_engine import BusinessImpactEngine
from agents.commander.attack_prediction_graph import AttackPredictionGraph
from agents.commander.enterprise_time_machine import EnterpriseTimeMachine


class ForecastEngine:
    """
    Commander AI Forecast Engine.
    """

    def __init__(self):

        self.risk = RiskForecast()

        self.business = BusinessForecast()

        self.target = TargetPredictor()

        self.confidence = ForecastConfidence()

        self.report = ForecastReport()

        self.risk_engine = EnterpriseRiskEngine()

        self.impact = BusinessImpactEngine()

        self.attack_graph = AttackPredictionGraph()

        self.time_machine = EnterpriseTimeMachine()

        

    def predict(self, incident):

        # ----------------------------
        # Enterprise Risk
        # ----------------------------

        enterprise = self.risk_engine.calculate(
            incident
        )

        #attack_path = self.attack_graph.predict(
        #    incident["category"]
        #)

        enterprise_score = enterprise["enterprise_score"]

        # ----------------------------
        # Confidence
        # ----------------------------

        confidence = self.confidence.calculate(
            incident
        )

        

        # ----------------------------
        # Forecast
        # ----------------------------

        forecast = {

            
            #"risk_forecast":

             #   self.risk.predict(
              #      incident,
               #     enterprise_score
                #),
            

            "time_machine": self.time_machine.predict(
                incident,
                enterprise
            ),

            "business_impact": self.impact.calculate(incident, enterprise),

            

            "predicted_target":

                self.target.predict(incident),

            "confidence":

                confidence["overall"],

            "confidence_breakdown":

                confidence["breakdown"],

            "enterprise_risk":

                enterprise,

            #"attack_graph": attack_path,

        }

        #print("\n===== FORECAST KEYS =====")
        #print(forecast.keys())
        #print("=========================\n")

        return self.report.build(

            incident,

            forecast

        )