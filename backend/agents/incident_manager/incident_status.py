class IncidentStatus:
    """
    Defines the lifecycle status
    of an incident.
    """

    def initial_status(self, priority):

        if priority == "CRITICAL":
            return "OPEN"

        if priority == "HIGH":
            return "OPEN"

        if priority == "MEDIUM":
            return "UNDER INVESTIGATION"

        return "MONITORING"