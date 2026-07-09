class BehaviorFeatures:
    """
    Converts behavioral analysis into
    ML feature vectors.
    """

    @staticmethod
    def build(result):

        return {

            "user_risk":
                result["user"]["risk"],

            "host_risk":
                result["host"]["risk"],

            "process_risk":
                result["process"]["risk"],

            "device_risk":
                result["device"]["risk"],

            "network_risk":
                result["network"]["risk"],

            "time_risk":
                result["time"]["risk"],

            "peer_risk":
                result["peer_group"]["risk"],

            "behavior_score":
                result["behavior_score"]

        }