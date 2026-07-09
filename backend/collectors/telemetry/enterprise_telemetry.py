from collectors.windows.windows_pipeline import WindowsPipeline


class EnterpriseTelemetry:
    """
    Enterprise Telemetry Manager.

    Collects telemetry from every platform.

    Future:
        Windows
        Linux
        Cloud
        Network
        Identity
    """

    def __init__(self):

        self.windows = WindowsPipeline()

    def collect(self):

        return {

            "windows":

                self.windows.run()

        }