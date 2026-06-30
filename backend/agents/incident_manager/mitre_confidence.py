class MitreConfidence:

    def score(self, packet):

        priority = packet["sentinel"]["priority"]

        scores = {

            "MEDIUM": 82,

            "HIGH": 91,

            "CRITICAL": 97

        }

        return scores[priority]