class CaseManager:
    """
    Creates investigation cases
    linked to incidents.
    """

    counter = 1

    def create(self, incident):

        case_id = f"CASE-{CaseManager.counter:05d}"

        CaseManager.counter += 1

        return {

            "case_id": case_id,

            "incident_id": incident["incident_id"],

            "owner": incident["assigned_owner"],

            "team": incident["assigned_team"],

            "status": "ACTIVE"

        }