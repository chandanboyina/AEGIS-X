class CollectorRegistry:
    """
    Enterprise Collector Registry.

    Maintains all telemetry collectors that are
    available in AEGIS-X.

    Future:
    - Dynamic plugin discovery
    - Enable / Disable collectors
    - Health monitoring
    """

    def __init__(self):

        self.collectors = {}

    def register(
        self,
        name,
        collector,
        parser
    ):

        self.collectors[name] = {

            "collector": collector,

            "parser": parser,

            "enabled": True

        }

    def unregister(
        self,
        name
    ):

        self.collectors.pop(
            name,
            None
        )

    def enable(
        self,
        name
    ):

        if name in self.collectors:

            self.collectors[name]["enabled"] = True

    def disable(
        self,
        name
    ):

        if name in self.collectors:

            self.collectors[name]["enabled"] = False

    def get_collectors(self):

        return self.collectors