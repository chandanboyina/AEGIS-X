import json


class WindowsCollector:

    def collect(self, path):

        with open(path) as file:

            return json.load(file)