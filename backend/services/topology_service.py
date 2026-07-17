class TopologyService:
    """
    Digital Twin topology.
    """

    def build(self, packet):

        return packet.get(
            "digital_twin",
            {}
        )