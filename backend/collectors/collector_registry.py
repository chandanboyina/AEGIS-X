from datetime import datetime


class CollectorRegistry:
    """
    Enterprise Collector Registry.
    """

    collectors = {}

    def register(self, name):

        CollectorRegistry.collectors[name] = {

            "status": "ONLINE",

            "registered_at": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            )

        }

    def update_status(self, name, status):

        if name in CollectorRegistry.collectors:

            CollectorRegistry.collectors[name]["status"] = status

    def get_all(self):

        return CollectorRegistry.collectors