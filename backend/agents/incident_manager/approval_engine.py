import random


class ApprovalEngine:
    """
    Enterprise approval workflow.
    """

    def build(self, packet, incident):

        category = packet["oracle"]["category"]

        if category not in [

            "Malware",

            "Privilege Escalation",

            "Ransomware"

        ]:

            return {

                "required": False

            }

        status = random.choice([

            "APPROVED",

            "APPROVED",

            "PENDING",

            "REJECTED"

        ])

        if status == "APPROVED":

            next_action = "Continue automated response"

        elif status == "PENDING":

            next_action = "Waiting for SOC Manager approval"

        else:

            next_action = "Assigned back to analyst"

        return {

            "required": True,

            "action":

                packet["sentinel"]["action"],

            "requested_by":

                "Sentinel AI",

            "approver":

                "SOC Manager",

            "status":

                status,

            "next_action":

                next_action

        }