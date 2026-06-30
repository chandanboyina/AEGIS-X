import random


class SLATracker:

    def build(self, packet, incident):

        priority = packet["sentinel"]["priority"]

        targets = {

            "CRITICAL": 15,

            "HIGH": 30,

            "MEDIUM": 60,

            "LOW": 120

        }

        target = targets[priority]

        # Occasionally exceed SLA
        elapsed = random.randint(

            target - 5,

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

            "target":

                f"{target} min",

            "elapsed":

                f"{elapsed} min",

            "remaining":

                f"{remaining} min",

            "status":

                status

        }