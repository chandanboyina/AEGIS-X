import numpy as np

from agents.ueba.behavior_baseline import BehaviorBaseline


class FeatureEngine:
    """
    Converts UEBA behavioral baseline
    into ML feature vectors.
    """

    def __init__(self):

        self.baseline = BehaviorBaseline()

    def extract(self, event):

        baseline = self.baseline.build(event)

        user = baseline["user"] or {}

        host = baseline["host"] or {}

        process = baseline["process"] or {}

        technique = event.get("mitre", {}).get(
            "technique"
        )

        features = [

            #
            # User
            #

            user.get("events", 0),

            user.get("powershell", 0),

            user.get("dns", 0),

            user.get("security", 0),

            #
            # Host
            #

            host.get("events", 0),

            len(host.get("users", [])),

            #
            # Process
            #

            process.get("events", 0),

            int(process.get("powershell", False)),

            process.get("network", 0),

            #
            # Current Event
            #

            event.get("risk_score", 0),

            event.get("confidence", 0),

            0 if technique in (
                process.get("mitre", [])
            ) else 1

        ]

        return np.array([features])