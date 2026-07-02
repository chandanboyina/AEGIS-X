class AttackSimulator:

    def simulate(self, topology):

        graph = topology["graph"]

        current = topology["entry"]

        visited = []

        while current in graph:

            visited.append(current)

            current = graph[current][0]

        visited.append(current)

        return visited