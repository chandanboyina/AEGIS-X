from agents.correlation.threat_correlation import ThreatCorrelation


class IntelligencePipeline:
    """
    Builds a single threat intelligence snapshot
    for the current incident.

    Every AI module shares this snapshot instead
    of recalculating intelligence independently.
    """

    def __init__(self):

        self.correlation = ThreatCorrelation()

    def build(
        self,
        incident
    ):

        intelligence = self.correlation.analyze(
            incident
        )

        incident["intelligence"] = {
            "threat": intelligence
        }

        return incident