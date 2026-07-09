from collectors.normalizer import LogNormalizer
from collectors.collector_registry import CollectorRegistry
import time
from collectors.collector_metrics import CollectorMetrics
from collectors.collector_health import CollectorHealth


class CollectorManager:
    """
    Enterprise Telemetry Manager.

    Collection

        ↓

    Parsing

        ↓

    Normalization

        ↓

    Oracle AI
    """

    def __init__(self):

        self.normalizer = LogNormalizer()

        self.registry = CollectorRegistry()

        self.metrics = CollectorMetrics()

        self.health = CollectorHealth()

    def register(
        self,
        name,
        collector,
        parser
    ):

        self.registry.register(

            name,

            collector,

            parser

        )

    def collect(self):

        events = []

        for name, item in self.registry.get_collectors().items():

            if not item["enabled"]:
                continue

            collector = item["collector"]

            parser = item["parser"]

            start = time.perf_counter()

            try:

                raw_logs = collector.collect()

            except Exception as e:

                self.health.update(

                    name,

                    False,

                    str(e)

                )

                continue

            latency = (

                time.perf_counter() - start

            ) * 1000

            normalized_count = 0

            for log in raw_logs:

                try:

                    parsed = parser.parse(log)

                    normalized = self.normalizer.normalize(

                        parsed,

                        collector=name

                    )

                    events.append(

                        normalized

                    )

                    normalized_count += 1

                except Exception as e:

                    self.metrics.update(
                        name,
                        0,
                        0,
                        success=False

                    )

                    continue

            self.metrics.update(
                name,
                normalized_count,
                latency,
                success=True
            )

            self.health.update(

                name,

                True,

                "Healthy"

            )

        return {

            "events": events,

            "metrics": self.metrics.get(),

            "health": self.health.get()

        }