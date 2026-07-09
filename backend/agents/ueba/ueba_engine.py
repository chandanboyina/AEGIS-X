from sklearn.ensemble import IsolationForest
import numpy as np
from agents.ueba.feature_engine import FeatureEngine
from agents.ueba.ueba_trainer import UEBATrainer
from collectors.windows.windows_pipeline import WindowsPipeline
from agents.ueba.behavior_features import BehaviorFeatures


class UEBAEngine:

    """
    User & Entity Behavior Analytics

    Uses unsupervised learning to detect
    anomalous behavior.
    """

    def __init__(self):

        self.model = IsolationForest(

            contamination=0.1,

            random_state=42

        )

        pipeline = WindowsPipeline()

        telemetry = pipeline.run()

        trainer = UEBATrainer()

        dataset = trainer.build_training_data(
            telemetry
        )

        self.model.fit(dataset)

        #
        # Temporary enterprise baseline.
        # Later this will come directly
        # from BehaviorDatabase.
        #

        #baseline = np.array([

        #    [400,150,120,80,600,6,50,1,0,20,80,0],

        #    [410,160,110,90,620,6,55,1,0,25,78,0],

        #    [390,145,118,82,590,6,48,1,0,18,82,0],

        #    [405,155,115,84,610,6,52,1,0,22,79,0],

        #    [420,170,120,88,640,6,60,1,0,28,81,0]

        #])

        #self.model.fit(baseline)

        self.features = FeatureEngine()

    def analyze(self, incident):

        features = self.features.extract(
            incident
        )

        prediction = self.model.predict(features)

        score = self.model.decision_function(features)[0]

        anomaly =bool(prediction[0] == -1)

        confidence = round(
            min(
                95,
                max(
                    20,
                    (1-score)*100
                )

            )

        )

        return {

            "anomaly": anomaly,

            "confidence": confidence,

            "score": float(score)

        }
    
    def analyze_behavior(
        self,
        behavior_result
    ):

        features = BehaviorFeatures.build(
            behavior_result
        )

        vector = np.array([[

            features["user_risk"],

            features["host_risk"],

            features["process_risk"],

            features["device_risk"],

            features["network_risk"],

            features["time_risk"],

            features["peer_risk"],

            features["behavior_score"]

        ]])

        prediction = self.model.predict(vector)

        score = self.model.decision_function(vector)[0]

        return {

            "anomaly": prediction[0] == -1,

            "ml_score": float(score)

        }