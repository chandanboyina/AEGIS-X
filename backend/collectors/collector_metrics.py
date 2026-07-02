class CollectorMetrics:
    """
    Enterprise Collector Metrics.
    """

    def __init__(self):

        self.events = 0

        self.errors = 0

        self.normalized = 0

    def event_received(self):

        self.events += 1

    def normalized_event(self):

        self.normalized += 1

    def error(self):

        self.errors += 1

    def report(self):

        return {

            "events_received":

                self.events,

            "normalized_events":

                self.normalized,

            "errors":

                self.errors

        }