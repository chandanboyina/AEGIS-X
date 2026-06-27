import random
from datetime import datetime, timedelta


class TimeGenerator:
    """
    Generates realistic enterprise timestamps.
    """

    @staticmethod
    def random_time():

        now = datetime.now()

        minutes_back = random.randint(0, 24 * 60)

        generated = now - timedelta(minutes=minutes_back)

        return generated

    @staticmethod
    def business_hours():

        hour = random.randint(8, 18)

        minute = random.randint(0, 59)

        return datetime.now().replace(
            hour=hour,
            minute=minute,
            second=random.randint(0, 59),
            microsecond=0
        )

    @staticmethod
    def night_hours():

        hour = random.choice([0, 1, 2, 3, 4, 5, 22, 23])

        minute = random.randint(0, 59)

        return datetime.now().replace(
            hour=hour,
            minute=minute,
            second=random.randint(0, 59),
            microsecond=0
        )