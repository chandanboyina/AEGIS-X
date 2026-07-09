class BehaviorEngine:
    """
    Extracts behavioral features from
    normalized telemetry.

    This is NOT UEBA.

    It only converts raw events into
    behavioral indicators.
    """

    def extract(
        self,
        event
    ):

        return {

            "failed_logins":

                1 if event["event_id"] == 4625 else 0,

            "powershell":

                1 if event["event_id"] == 4104 else 0,

            "admin_account":

                1 if event["user"] == "Administrator" else 0,

            "critical":

                1 if event["severity"] == "CRITICAL" else 0,

            "ioc_count":

                len(

                    event.get(

                        "ioc_list",

                        []

                    )

                )

        }