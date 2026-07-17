class CouncilService:
    """
    AI Council Service.
    """

    def build(self, packet):

        incident = packet.get("incident", {})

        return incident.get("council", {})