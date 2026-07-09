import random


class SLATracker:
    """
    Enterprise SLA Tracker.
    """

    def build(self, packet, incident):

        #
        # Normalize priority
        #

        priority = (

            packet["sentinel"]["priority"]

            .upper()

        )

        targets = {

            "LOW": 120,

            "MEDIUM": 60,

            "HIGH": 30,

            "CRITICAL": 15

        }

        target = targets.get(

            priority,

            60

        )

        #
        # Simulate elapsed time
        #

        elapsed = random.randint(

            max(target - 5, 1),

            target + 15

        )

        if elapsed < target:

            status = "ON TRACK"

        elif elapsed == target:

            status = "AT RISK"

        else:

            status = "BREACHED"

        remaining = max(

            target - elapsed,

            0

        )

        return {

            "priority": priority,

            "target": f"{target} min",

            "elapsed": f"{elapsed} min",

            "remaining": f"{remaining} min",

            "status": status

        }