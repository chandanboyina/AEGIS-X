class LogNormalizer:
    """
    Universal Enterprise Log Normalizer

    Converts logs from different platforms
    into one common event schema.
    """

    def normalize(self, event):

        return {

            "timestamp":

                event.get("timestamp"),

            "source":

                event.get("source"),

            "asset":

                event.get("asset"),

            "user":

                event.get("user"),

            "source_ip":

                event.get("source_ip"),

            "destination_ip":

                event.get("destination_ip"),

            "event":

                event.get("event"),

            "event_id":

                event.get("event_id"),

            "severity":

                event.get("severity"),

            "raw":

                event

        }