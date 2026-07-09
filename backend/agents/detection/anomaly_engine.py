from agents.ueba.ueba_engine import UEBAEngine


class AnomalyEngine:
    """
    Uses the existing UEBA Engine.

    Detection owns orchestration.

    UEBA owns anomaly detection.
    """

    def __init__(self):

        self.ueba = UEBAEngine()

    def analyze(

        self,

        incident

    ):

        return self.ueba.analyze(
            incident
        )