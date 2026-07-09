class CollectorHealth:
    """
    Enterprise Collector Health Monitor
    """

    def __init__(self):

        self.health = {}

    def update(
        self,
        collector,
        success,
        message
    ):

        self.health[collector] = {

            "status":
                "HEALTHY" if success else "FAILED",

            "message":
                message

        }

    def get(self):

        return self.health

    def status(
        self,
        latency,
        events
    ):

        if events == 0:
            return "WARNING"

        if latency > 1000:
            return "DEGRADED"

        return "HEALTHY"