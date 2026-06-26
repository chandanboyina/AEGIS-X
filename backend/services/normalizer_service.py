class EventNormalizer:

    @staticmethod
    def normalize(
        source: str,
        event_type: str,
        severity: str,
        description: str,
        raw_log: str,
    ):

        severity = severity.upper()

        if severity == "LOW":
            score = 0.20

        elif severity == "MEDIUM":
            score = 0.50

        elif severity == "HIGH":
            score = 0.80

        elif severity == "CRITICAL":
            score = 0.95

        else:
            score = 0.10

        return {
            "source": source,
            "event_type": event_type,
            "severity": severity,
            "description": description.strip(),
            "raw_log": raw_log.strip(),
            "anomaly_score": score,
        }