class WindowsParser:
    """
    Parses Windows Security Events.
    """

    def parse(self, log):

        return {

            "timestamp":

                log["timestamp"],

            "source":

                "Windows",

            "asset":

                log["asset"],

            "user":

                log["user"],

            "source_ip":

                log["source_ip"],

            "destination_ip":

                log.get("destination_ip"),

            "event":

                log["event"],

            "event_id":

                log["event_id"],

            "severity":

                log["severity"]

        }