from datetime import datetime


class CollectorMetrics:
    """
    Tracks runtime statistics for every collector.
    """

    def __init__(self):

        self.metrics = {}

    def update(
        self,
        collector_name,
        events,
        latency,
        success=True

    ):

        metric = self.metrics.setdefault(

            collector_name,

            {

                "events":0,

                "runs":0,

                "failed_runs":0,

                "last_latency":0,

                "average_latency":0,

                "last_collection":None

            }

        )

        metric["runs"] += 1

        if success:

            metric["events"] += events

        else:

            metric["failed_runs"] += 1

        metric["last_latency"] = latency

        metric["average_latency"] = round(

            (

                metric["average_latency"]

                *

                (metric["runs"]-1)

                +

                latency

            )

            /

            metric["runs"],

            2

        )

        metric["last_collection"] = datetime.now().isoformat()

    def get(self):

        return self.metrics