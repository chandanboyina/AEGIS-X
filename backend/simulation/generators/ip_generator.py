import random


class IPGenerator:
    """
    Generates realistic IPv4 addresses.
    """

    @staticmethod
    def internal():

        return (
            f"10."
            f"{random.randint(0,255)}."
            f"{random.randint(0,255)}."
            f"{random.randint(1,254)}"
        )

    @staticmethod
    def external():

        first = random.choice(
            [23,45,61,91,103,118,152,172,185,203]
        )

        return (
            f"{first}."
            f"{random.randint(0,255)}."
            f"{random.randint(0,255)}."
            f"{random.randint(1,254)}"
        )