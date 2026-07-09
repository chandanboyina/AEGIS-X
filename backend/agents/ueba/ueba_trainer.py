import numpy as np

from agents.ueba.feature_engine import FeatureEngine


class UEBATrainer:
    """
    Trains the UEBA model using
    enterprise telemetry.
    """

    def __init__(self):

        self.features = FeatureEngine()

    def build_training_data(self, telemetry):

        dataset = []

        for collector in telemetry.values():

            for event in collector:

                vector = self.features.extract(event)[0]

                dataset.append(vector)

        return np.array(dataset)