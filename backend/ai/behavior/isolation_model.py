from sklearn.ensemble import IsolationForest
import numpy as np

import joblib
from pathlib import Path

from datetime import datetime


class BehaviorIsolationModel:
    """
    Isolation Forest model for behavioral
    anomaly detection.
    """

    def __init__(self):

        self.model = IsolationForest(
            n_estimators=100,
            contamination=0.05,
            random_state=42,
        )

        self.training_data = []

        self.trained = False
        self.algorithm = "Isolation Forest"

        self.version = "1.0"

        self.contamination = 0.05   

        self.training_history = [] 

        # ---------------------------------------
        # Model Persistence
        # ---------------------------------------

        self.model_path = Path(
            "models/behavior/isolation_forest.pkl"
        )

    def add_training_sample(self, packet: dict):

        features = packet["behavior"]["features"]

        vector = [

            features["severity_score"],

            features["event_type_score"],

            features["description_length"],

            features["raw_log_length"],

            features["hour"],

            features["business_hours"],

        ]

        self.training_data.append(vector)

    def train(self):

        start_time = datetime.now()

        if len(self.training_data) < 10:

            self.training_history.append({

                "timestamp": start_time.isoformat(),

                "status": "FAILED",

                "reason": "Insufficient training samples",

                "samples": len(self.training_data),

                "algorithm": self.algorithm,

                "version": self.version,

            })

            return False

        data = np.array(self.training_data)

        self.model.fit(data)

        self.trained = True

        end_time = datetime.now()

        self.training_history.append({

            "timestamp": end_time.isoformat(),

            "status": "SUCCESS",

            "samples": len(self.training_data),

            "algorithm": self.algorithm,

            "version": self.version,

            "duration_seconds":
                round(
                    (end_time - start_time).total_seconds(),
                    4,
                )

        })

        return True
    
    
    def predict(self, packet: dict):

        if not self.trained:
            raise RuntimeError(
                "Isolation Forest model is not trained."
            )

        features = packet["behavior"]["features"]

        vector = [[
            features["severity_score"],
            features["event_type_score"],
            features["description_length"],
            features["raw_log_length"],
            features["hour"],
            features["business_hours"],
        ]]

        prediction = self.model.predict(vector)[0]

        score = self.model.decision_function(vector)[0]

        return prediction, score

    @staticmethod
    def prediction_label(prediction: int):

        if prediction == -1:
            return "ANOMALY"

        return "NORMAL"
    

    def save(self, model_path: str):

        Path(model_path).parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        joblib.dump(
            self.model,
            model_path,
        )

    def save_model(self):
        """
        Save the trained Isolation Forest model.
        """

        self.save(
            str(self.model_path)
        )

    def load(self, model_path: str):

        self.model = joblib.load(
            model_path
        )

        self.trained = True

    def load_model(self):
        """
        Load a previously trained model.
        """

        if self.model_path.exists():

            self.load(
                str(self.model_path)
            )

            return True

        return False

    def metrics(self):

        return {

            "status":
                "Trained"
                if self.trained
                else "Not Trained",

            "algorithm":
                self.algorithm,

            "training_samples":
                len(self.training_data),

            "features":
                6,

            "contamination":
                self.contamination,

            "version":
                self.version,

        }
    def get_training_history(self):

        return self.training_history