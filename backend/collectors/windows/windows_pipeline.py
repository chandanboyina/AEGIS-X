from collectors.windows.windows_collector import WindowsCollector
from collectors.windows.windows_parser import WindowsParser


class WindowsPipeline:
    """
    Enterprise Windows Telemetry Pipeline.
    """

    def __init__(self):

        self.collector = WindowsCollector()

        self.parser = WindowsParser()

    def run(self):

        #
        # Collect Live Telemetry
        #

        telemetry = self.collector.collect()

        #
        # Normalize Telemetry
        #

        parsed = self.parser.parse(

            telemetry

        )

        return parsed