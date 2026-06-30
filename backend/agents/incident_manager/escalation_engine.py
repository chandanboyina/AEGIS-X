class EscalationEngine:
    """
    Determines incident escalation.
    """

    def build(self, packet, incident):

        priority = packet["sentinel"]["priority"]

        current_team = incident["assigned_team"]

        if priority == "CRITICAL":

            return {

                "current_team": current_team,

                "escalated_to": "Incident Response Team",

                "reason": packet["oracle"]["category"],

                "status": "ESCALATED"

            }

        return {

            "current_team": current_team,

            "escalated_to": "None",

            "reason": "-",

            "status": "Not Required"

        }