from collections import defaultdict
from pathlib import Path

import joblib


class BehaviorBaseline:
    """
    Learns normal behaviour for each asset
    using running averages.
    """

    def __init__(self):

        # Stores learned baseline for every asset
        self.asset_profiles = defaultdict(
            lambda: {
                "event_count": 0,
                "avg_severity": 0.0,
                "avg_description_length": 0.0,
                "avg_rawlog_length": 0.0,
                "avg_event_type": 0.0,
            }
        )

        # Location where baseline will be stored
        self.baseline_path = Path(
            "models/behavior/baseline.pkl"
        )

    # ---------------------------------------------------
    # Learning
    # ---------------------------------------------------

    def update(self, packet: dict):

        hostname = packet["asset"]["hostname"]

        features = packet["behavior"]["features"]

        profile = self.asset_profiles[hostname]

        profile["event_count"] += 1

        n = profile["event_count"]

        profile["avg_severity"] = (
            (
                profile["avg_severity"] * (n - 1)
                + features["severity_score"]
            )
            / n
        )

        profile["avg_description_length"] = (
            (
                profile["avg_description_length"] * (n - 1)
                + features["description_length"]
            )
            / n
        )

        profile["avg_rawlog_length"] = (
            (
                profile["avg_rawlog_length"] * (n - 1)
                + features["raw_log_length"]
            )
            / n
        )

        profile["avg_event_type"] = (
            (
                profile["avg_event_type"] * (n - 1)
                + features["event_type_score"]
            )
            / n
        )

        return profile

    # ---------------------------------------------------
    # Query
    # ---------------------------------------------------

    def get_profile(self, hostname: str):

        return self.asset_profiles.get(hostname)

    # ---------------------------------------------------
    # Persistence
    # ---------------------------------------------------

    def save(self):
        """
        Save learned baseline to disk.
        """

        self.baseline_path.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        joblib.dump(
            dict(self.asset_profiles),
            self.baseline_path,
        )

    def load(self):
        """
        Load learned baseline from disk.
        """

        if not self.baseline_path.exists():

            return False

        data = joblib.load(
            self.baseline_path
        )

        self.asset_profiles = defaultdict(
            lambda: {
                "event_count": 0,
                "avg_severity": 0.0,
                "avg_description_length": 0.0,
                "avg_rawlog_length": 0.0,
                "avg_event_type": 0.0,
            },
            data,
        )

        return True

    def is_loaded(self):

        return len(self.asset_profiles) > 0

    # ---------------------------------------------------
    # Utility
    # ---------------------------------------------------

    def clear(self):
        """
        Reset all learned baselines.
        """

        self.asset_profiles = defaultdict(
            lambda: {
                "event_count": 0,
                "avg_severity": 0.0,
                "avg_description_length": 0.0,
                "avg_rawlog_length": 0.0,
                "avg_event_type": 0.0,
            }
        )