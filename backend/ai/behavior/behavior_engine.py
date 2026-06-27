from ai.behavior.baseline import BehaviorBaseline
from ai.behavior.isolation_model import BehaviorIsolationModel


class BehaviorEngine:
    """
    Central behavioral intelligence engine.
    Coordinates learning and anomaly detection.
    """

    def __init__(self):

        self.baseline = BehaviorBaseline()

        self.model = BehaviorIsolationModel()

        # ------------------------
        # Load baseline
        # ------------------------

        if self.baseline.load():

            print(
                "[Behavior Engine] Baseline loaded."
            )

        else:

            print(
                "[Behavior Engine] No saved baseline."
            )

        # ------------------------
        # Load ML model
        # ------------------------

        if self.model.load_model():

            print(
                "[Behavior Engine] Trained model loaded."
            )

        else:

            print(
                "[Behavior Engine] No trained model found."
        )
    def learn(self, packet: dict):

        """
        Learn normal behaviour from one packet.
        """

        self.baseline.update(packet)

        self.model.add_training_sample(packet)

    def train(self):

        trained = self.model.train()

        if trained:

            self.model.save_model()

            self.baseline.save()

            print(
                "[Behavior Engine] Model saved."
            )

            print(
                "[Behavior Engine] Baseline saved."
            )

        return trained

    def analyze(self, packet: dict):

        """
        Analyze one Cyber Evidence Packet.
        """

        prediction, confidence = self.model.predict(packet)

        # -----------------------------
        # Get learned baseline
        # -----------------------------

        baseline = self.baseline.get_profile(
            packet["asset"]["hostname"]
        )

        # If this asset has never been learned,
        # create a default baseline.
        if baseline is None:

            baseline = {

                "event_count": 0,

                "avg_severity": 0,

                "avg_description_length": 0,

                "avg_rawlog_length": 0,

                "avg_event_type": 0

            }

        result = {

            "prediction":
                self.model.prediction_label(
                    prediction
                ),

            "confidence":
                round(float(confidence), 4),

            "baseline": baseline,

            "model":
                self.model.metrics(),

            "training_history":
                self.model.get_training_history()

        }

        return result
       