class RecoveryStatus:
    """
    Dynamic recovery status based on approval workflow.
    """

    def build(self, packet, incident):

        approval_data = incident["approval"]

        # Incidents that do not require approval
        if not approval_data["required"]:

            approval = "APPROVED"

        else:

            approval = approval_data["status"]

        category = packet["oracle"]["category"]

        # ----------------------------------------
        # Overall Status
        # ----------------------------------------

        if approval == "APPROVED":

            overall = "COMPLETED"

        elif approval == "PENDING":

            overall = "WAITING FOR APPROVAL"

        else:

            overall = "ROLLED BACK"

        # ----------------------------------------
        # Recovery Details
        # ----------------------------------------

        if approval == "APPROVED":

            if category == "Reconnaissance":

                systems = "Monitoring Enabled"
                integrity = "Verified"
                business = "Operational"

            elif category == "Credential Access":

                systems = "Credentials Reset"
                integrity = "Verified"
                business = "Operational"

            elif category == "Privilege Escalation":

                systems = "Privileges Revoked"
                integrity = "Verified"
                business = "Operational"

            elif category == "Malware":

                systems = "Endpoint Rebuilt"
                integrity = "Verified"
                business = "Available"

            else:

                systems = "Backup Restored"
                integrity = "Verified"
                business = "Operational"

        elif approval == "PENDING":

            systems = "Awaiting Restore"
            integrity = "Pending"
            business = "Limited"

        else:

            systems = "Restore Cancelled"
            integrity = "Not Verified"
            business = "Interrupted"

        return {

            "status": overall,

            "systems": systems,

            "integrity": integrity,

            "business": business

        }