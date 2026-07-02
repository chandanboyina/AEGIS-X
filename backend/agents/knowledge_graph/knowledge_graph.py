class EnterpriseKnowledgeGraph:

    def __init__(self):

        self.nodes = {}

        self.edges = {}

    def add_node(

        self,

        node_id,

        node_type,

        **attributes

    ):

        self.nodes[node_id] = {

            "type": node_type,

            "attributes": attributes

        }

    def add_edge(

        self,

        source,

        relation,

        target

    ):

        self.edges.setdefault(

            source,

            []

        ).append(

            {

                "relation": relation,

                "target": target

            }

        )

    def neighbors(

        self,

        node

    ):

        return self.edges.get(

            node,

            []

        )

    def get_node(

        self,

        node

    ):

        return self.nodes.get(

            node,

            {}

        )