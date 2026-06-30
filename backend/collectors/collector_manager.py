from collectors.normalizer import LogNormalizer


class CollectorManager:
    """
    Enterprise Log Collection Manager.
    """

    def __init__(self):

        self.normalizer = LogNormalizer()

    def collect(self, events):

        normalized = []

        for event in events:

            normalized.append(

                self.normalizer.normalize(event)

            )

        return normalized