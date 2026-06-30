from datetime import datetime, timedelta


class ActivityFeed:
    """
    Builds analyst activity feed.
    """

    def build(self, packet, incident):

        created = datetime.strptime(
            incident["created"],
            "%Y-%m-%d %H:%M:%S"
        )

        return [

            {
                "time": (
                    created +
                    timedelta(seconds=0)
                ).strftime("%H:%M:%S"),

                "type": "EVENT",

                "message":
                    "Event generated."
            },

            {
                "time": (
                    created +
                    timedelta(seconds=1)
                ).strftime("%H:%M:%S"),

                "type": "ORACLE",

                "message":
                    f"Threat categorized as {packet['oracle']['category']}."
            },

            {
                "time": (
                    created +
                    timedelta(seconds=2)
                ).strftime("%H:%M:%S"),

                "type": "MITRE",

                "message":
                    "MITRE ATT&CK mapping completed."
            },

            {
                "time": (
                    created +
                    timedelta(seconds=3)
                ).strftime("%H:%M:%S"),

                "type": "SENTINEL",

                "message":
                    f"Executed response '{packet['sentinel']['action']}'."
            },

            {
                "time": (
                    created +
                    timedelta(seconds=4)
                ).strftime("%H:%M:%S"),

                "type": "CASE",

                "message":
                    f"Investigation case {incident['case']['case_id']} created."
            },

            {
                "time": (
                    created +
                    timedelta(seconds=5)
                ).strftime("%H:%M:%S"),

                "type": "RECOVERY",

                "message":
                    "Recovery workflow started."
            }

        ]