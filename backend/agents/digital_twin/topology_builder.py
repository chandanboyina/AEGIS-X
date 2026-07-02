class TopologyBuilder:
    """
    Builds an enterprise dependency graph
    from Asset Inventory relationships.
    """

    def build(self, incident):

        asset = incident["asset"]

        topology = {

            "FW": ["LB"],

            "LB": ["WEB"],

            "WEB": ["APP"],

            "APP": ["API"],

            "API": ["AUTH"],

            "AUTH": ["DB"],

            "DB": ["BACKUP"],

            "VPN": ["AUTH"],

            "EMAIL": ["AUTH"],

            "DC": ["AUTH"]

        }

        node = asset.split("-")[1]

        return {

            "entry": node,

            "graph": topology

        }