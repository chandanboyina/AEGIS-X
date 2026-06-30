class IncidentHistory:
    """
    Maintains incident activity history.
    """

    def build(self, packet):

        history = []

        history.append({
            "stage": "Oracle AI",
            "message": "Threat investigation completed."
        })

        history.append({
            "stage": "Sentinel AI",
            "message": "Response workflow executed."
        })

        return history