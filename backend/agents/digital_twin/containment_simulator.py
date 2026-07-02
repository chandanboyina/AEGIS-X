class ContainmentSimulator:

    def simulate(self, spread):

        blocked = []

        for service in spread:

            blocked.append({

                "service": service["service"],

                "isolated": True

            })

        return blocked