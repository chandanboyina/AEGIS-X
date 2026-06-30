from datetime import datetime


class AnalystComments:
    """
    Simulates analyst comments during an investigation.
    """

    def build(self, packet, incident):

        owner = incident["assigned_owner"]

        category = packet["oracle"]["category"]

        response = packet["sentinel"]["action"]

        return [

            {

                "time": datetime.now().strftime("%H:%M:%S"),

                "author": owner,

                "comment":
                    f"{category} investigation started."

            },

            {

                "time": datetime.now().strftime("%H:%M:%S"),

                "author": "Oracle AI",

                "comment":
                    "Threat confidence remains HIGH."

            },

            {

                "time": datetime.now().strftime("%H:%M:%S"),

                "author": "Sentinel AI",

                "comment":
                    f"Executed response '{response}'."

            }

        ]