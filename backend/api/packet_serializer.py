class PacketSerializer:
    """
    Converts the complete Enterprise Packet
    into a dashboard-friendly format.

    This becomes the single interface
    between the backend AI and frontend UI.
    """

    def serialize(self, packet):

        return {

            # Enterprise metadata
            "metadata": packet.get("metadata"),

            "pipeline": packet.get("pipeline"),

            "trace": packet.get("trace"),

            "enterprise": packet.get("enterprise"),

            # Core AI
            "observer": packet.get("observer"),

            "behavior": packet.get("behavior"),

            "correlation": packet.get("correlation"),

            "oracle": packet.get("oracle"),

            "sentinel": packet.get("sentinel"),

            "incident": packet.get("incident"),

            # Intelligence
            "brain": packet.get("brain"),

            "cyber_dna": packet.get("cyber_dna"),

            "digital_twin": packet.get("digital_twin"),

            # Audit
            "audit": packet.get("audit", [])
        }