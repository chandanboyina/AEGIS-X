from sklearn.ensemble import IsolationForest
import numpy as np


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

        # Simple baseline until real logs are used
        baseline = np.array([

            [1,1,1],
            [2,2,1],
            [1,2,1],
            [2,1,2],
            [1,1,2],
            [2,2,2],
            [3,2,2],
            [2,3,2],
            [3,3,3]

        ])

        self.model.fit(baseline)

    def analyze(self, incident):

        features = np.array([[

            incident.get("failed_logins", 1),

            incident.get("ioc_count", 1),

            incident.get("enterprise_risk", 50)

        ]])

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