class SpreadEngine:

    def predict(self, path):

        spread = []

        for node in path:

            spread.append({

                "service": node,

                "status": "Compromised"

            })

        return spread