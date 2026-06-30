from datetime import timedelta
import random


class CaseMetrics:
    """
    Enterprise Case Metrics
    """

    def build(self, packet, incident):

        # ----------------------------------------
        # Simulated Investigation Time
        # ----------------------------------------

        elapsed = timedelta(
            minutes=random.randint(2, 25),
            seconds=random.randint(0, 59)
        )

        minutes = elapsed.seconds // 60
        seconds = elapsed.seconds % 60

        # ----------------------------------------
        # Approval Information
        # ----------------------------------------

        approval = incident["approval"]

        # ----------------------------------------
        # Recovery Progress
        # ----------------------------------------

        if not approval["required"]:

            # Incidents that do not require approval
            recovered_systems = 1

        elif approval["status"] == "APPROVED":

            recovered_systems = 1

        else:

            # PENDING or REJECTED
            recovered_systems = 0

        # ----------------------------------------
        # Current Phase
        # ----------------------------------------

        if not approval["required"]:

            phase = "Investigation"

        elif approval["status"] == "APPROVED":

            phase = "Recovery"

        elif approval["status"] == "PENDING":

            phase = "Awaiting Approval"

        elif approval["status"] == "REJECTED":

            phase = "Reassigned to Analyst"

        else:

            phase = incident["status"]

        # ----------------------------------------
        # Return Enterprise Metrics
        # ----------------------------------------

        return {

            "evidence_items":
                len(incident["evidence"]),

            "recovered_systems":
                recovered_systems,

            "affected_assets":
                incident["investigation_summary"]["affected_assets"],

            "affected_users":
                incident["investigation_summary"]["affected_users"],

            "analyst_actions":
                len(incident["analyst_actions"]),

            "elapsed_time":
                f"{minutes} min {seconds} sec",

            "current_phase":
                phase

        }