class IncidentLifecycle:
    """
    Simulates an enterprise incident lifecycle.
    """

    def progress(self, incident):

        status = incident["status"]

        if status == "OPEN":

            return "UNDER INVESTIGATION"

        elif status == "UNDER INVESTIGATION":

            return "CONTAINED"

        elif status == "CONTAINED":

            return "RECOVERING"

        elif status == "RECOVERING":

            return "RESOLVED"

        elif status == "RESOLVED":

            return "CLOSED"

        return status