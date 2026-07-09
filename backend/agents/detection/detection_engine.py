from agents.detection.behavior_engine import BehaviorEngine
from agents.detection.anomaly_engine import AnomalyEngine


class DetectionEngine:
    """
    Enterprise Detection Pipeline.

    Telemetry

        ↓

    Behavior Extraction

        ↓

    UEBA

        ↓

    Detection Result
    """

    def __init__(self):

        self.behavior = BehaviorEngine()

        self.anomaly = AnomalyEngine()

    def analyze(
        self,
        event
    ):

        features = self.behavior.extract(
            event
        )

        incident = {

            "failed_logins":

                features["failed_logins"],

            "ioc_count":

                features["ioc_count"],

            "enterprise_risk":

                50

        }

        anomaly = self.anomaly.analyze(
            incident
        )

        return {

            "features": features,

            "ueba": anomaly

        }