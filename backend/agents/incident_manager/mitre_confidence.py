class MitreConfidence:

    def score(self, packet):

        priority = (

            packet["sentinel"]["priority"]

            .upper()

        )

        scores = {

            "LOW": 50,

            "MEDIUM": 82,

            "HIGH": 91,

            "CRITICAL": 97

        }

        return scores.get(priority, 50)