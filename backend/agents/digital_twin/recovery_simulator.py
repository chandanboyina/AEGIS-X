class RecoverySimulator:

    def simulate(self, spread):

        minutes = len(spread) * 15

        return {

            "estimated_recovery":

                f"{minutes} Minutes",

            "services_restored":

                len(spread)

        }