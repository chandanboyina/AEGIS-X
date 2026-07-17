class PacketSerializer:
    """
    Converts the complete Enterprise Packet
    into a dashboard-friendly format.

    This becomes the single interface
    between the backend AI and frontend UI.
    """

    def serialize(self, packet):

        return {

            # -------------------------
            # Enterprise
            # -------------------------

            "metadata": packet.get("metadata"),

            "pipeline": packet.get("pipeline"),

            "trace": packet.get("trace"),

            "enterprise": packet.get("enterprise"),

            # -------------------------
            # AI Engines
            # -------------------------

            "observer": packet.get("observer"),

            "behavior": packet.get("behavior"),

            "correlation": packet.get("correlation"),

            "oracle": packet.get("oracle"),

            "sentinel": packet.get("sentinel"),

            # -------------------------
            # Incident
            # -------------------------

            "incident": packet.get("incident"),

            # -------------------------
            # Commander
            # -------------------------

            "commander":

                packet.get(
                    "incident",
                    {}
                ).get(
                    "commander",
                    {}
                ),

            # -------------------------
            # AI Council
            # -------------------------

            "council":

                packet.get(
                    "incident",
                    {}
                ).get(
                    "council",
                    {}
                ),

            # -------------------------
            # Enterprise Intelligence
            # -------------------------

            "brain": packet.get("brain"),

            "cyber_dna": packet.get("cyber_dna"),

            "digital_twin": packet.get("digital_twin"),

            # -------------------------
            # Audit
            # -------------------------

            "audit": packet.get(
                "audit",
                []
            )

        }