import random

from datetime import datetime


class CollectorHealth:
    """
    Enterprise Collector Health.
    """

    def check(self, name):

        latency = random.randint(5, 40)

        return {

            "collector":

                name,

            "status":

                "ONLINE",

            "latency":

                f"{latency} ms",

            "last_event":

                datetime.now().strftime(

                    "%H:%M:%S"

                )

        }