from services.normalizer_service import EventNormalizer


class ObserverAgent:

    ANOMALY_THRESHOLD = 0.70

    @staticmethod
    def analyze(event: dict):

        normalized = EventNormalizer.normalize(
            source=event["source"],
            event_type=event["event_type"],
            severity=event["severity"],
            description=event["description"],
            raw_log=event["raw_log"],
        )

        anomaly = normalized["anomaly_score"]

        if anomaly >= ObserverAgent.ANOMALY_THRESHOLD:

            return {
                "status": "ALERT",
                "message": "Behavioral anomaly detected.",
                "event": normalized,
            }

        return {
            "status": "NORMAL",
            "message": "No anomaly detected.",
            "event": normalized,
        }