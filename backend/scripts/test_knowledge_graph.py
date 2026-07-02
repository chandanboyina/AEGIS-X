from agents.knowledge_graph.knowledge_graph import EnterpriseKnowledgeGraph
from agents.knowledge_graph.graph_query import GraphQuery

graph = EnterpriseKnowledgeGraph()

# -------------------------
# Create Nodes
# -------------------------

graph.add_node(

    "finance.admin",

    "User",

    role="Administrator",

    department="Finance",

    location="Delhi",

    mfa=True

)

graph.add_node(

    "CBSE-VPN-01",

    "Asset",

    criticality="High",

    service="Remote Access",

    department="IT",

    os="Windows",

    owner="Infrastructure Team"

)

graph.add_node(

    "Credential Attack",

    "IOC"

)

graph.add_node(

    "VPN Service",

    "Service"

)

# -------------------------
# Create Relationships
# -------------------------

graph.add_edge(

    "finance.admin",

    "LOGGED_INTO",

    "CBSE-VPN-01"

)

graph.add_edge(

    "CBSE-VPN-01",

    "HAS_IOC",

    "Credential Attack"

)

graph.add_edge(

    "CBSE-VPN-01",

    "USES",

    "VPN Service"

)

query = GraphQuery(graph)

print()

print("="*60)

print("ENTERPRISE KNOWLEDGE GRAPH")

print("="*60)

print()

print("Assets for finance.admin")

print(

    query.assets_for_user(

        "finance.admin"

    )

)

print()

print("IOCs")

print(

    query.iocs_for_asset(

        "CBSE-VPN-01"

    )

)

print()

print("Services")

print(

    query.services_for_asset(

        "CBSE-VPN-01"

    )

)

print()

print("Node Details")

print("--------------------------------")

print(

    graph.get_node(

        "CBSE-VPN-01"

    )

)