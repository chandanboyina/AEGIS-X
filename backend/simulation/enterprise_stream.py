import random

from simulation.event_generator import EnterpriseEventGenerator


class EnterpriseEventStream:
    """
    Generates a realistic enterprise timeline.

    Business activity happens first.

    Attack activity appears later.
    """

    def __init__(self):

        self.generator = EnterpriseEventGenerator()

    def generate_stream(self):

        stream = []

        # --------------------------
        # Normal business
        # --------------------------

        for _ in range(random.randint(8, 15)):

            stream.append(
                self.generator.generate_normal_event()
            )

        # --------------------------
        # Recon stage
        # --------------------------

        for _ in range(random.randint(2, 4)):

            stream.append(
                self.generator.generate_recon_event()
            )

        # --------------------------
        # Credential attacks
        # --------------------------

        for _ in range(random.randint(1, 3)):

            stream.append(
                self.generator.generate_credential_attack()
            )

        # --------------------------
        # Malware
        # --------------------------

        for _ in range(random.randint(1, 2)):

            stream.append(
                self.generator.generate_malware_event()
            )

        # --------------------------
        # Ransomware
        # --------------------------

        if random.random() < 0.60:

            stream.append(
                self.generator.generate_ransomware_event()
            )

        return stream