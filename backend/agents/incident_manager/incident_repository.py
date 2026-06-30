class IncidentRepository:
    """
    Enterprise Incident Repository.
    Stores every incident for threat hunting.
    """

    incidents = []

    def add(self, incident):

        IncidentRepository.incidents.append(incident)

    def all(self):

        return IncidentRepository.incidents