from datetime import datetime


class InvestigationTimeline:
    """
    Builds the investigation timeline.
    """

    def build(self, packet, incident):

        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        return [

            {
                "time": current_time,
                "actor": "Oracle AI",
                "action": f"Detected {packet['oracle']['category']} activity."
            },

            {
                "time": current_time,
                "actor": "Sentinel AI",
                "action": f"Executed response '{packet['sentinel']['action']}'."
            },

            {
                "time": current_time,
                "actor": "Incident Manager",
                "action": f"Created incident {incident['incident_id']}."
            },

            {
                "time": current_time,
                "actor": "Case Manager",
                "action": f"Opened case {incident['case']['case_id']}."
            }

        ]