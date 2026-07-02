class EnterpriseDependencyGraph:
    """
    Enterprise Dependency Graph.

    Represents logical service dependencies.
    Later this can come from CMDB,
    Active Directory, Kubernetes,
    Azure, AWS, etc.
    """

    def __init__(self):

        self.graph = {

            "Internet": [

                "FW"

            ],

            "FW": [

                "LB",

                "VPN"

            ],

            "LB": [

                "WEB"

            ],

            "WEB": [

                "APP",

                "API"

            ],

            "API": [

                "AUTH"

            ],

            "AUTH": [

                "DB"

            ],

            "DB": [

                "BACKUP"

            ],

            "VPN": [

                "AUTH"

            ],

            "DNS": [

                "WEB"

            ]

        }

    def find_dependencies(self, hostname):

        hostname = hostname.upper()

        node = None

        for key in self.graph:

            if key in hostname:

                node = key

                break

        if node is None:

            return []

        visited = set()

        affected = []

        self._dfs(

            node,

            visited,

            affected

        )

        return affected

    def _dfs(

        self,

        node,

        visited,

        affected

    ):

        if node in visited:

            return

        visited.add(node)

        affected.append(node)

        for nxt in self.graph.get(node, []):

            self._dfs(

                nxt,

                visited,

                affected

            )